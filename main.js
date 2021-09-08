import { htmlElementParser, insertHTML } from './scripts/htmlUtils';
import { plantCard, cardType } from './scripts/templates/plantCard';
import insertErrorMessage from './scripts/templates/errorMessage';
import heading from './scripts/templates/heading';
import loadingSpinner from './scripts/templates/loadingSpinner';
import returnButton from './scripts/templates/returnButton';
import fetchData from './scripts/fetchData';

document.getElementById('form').addEventListener('change', loadData);
document.getElementById('bottomArrow').addEventListener('click', () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }));

const results = document.getElementById('resultsContainer');
const sunSelect = document.getElementById('sun');
const waterSelect = document.getElementById('water');
const petsSelect = document.getElementById('pets');

const baseURL = 'https://front-br-challenges.web.app/api/v2/green-thumb/';

async function loadData() {
  if (sunSelect.value === '' || waterSelect.value === '' || petsSelect.value === '') {
    return;
  }
  loadingSpinner(results);
  try {
    const url = `${baseURL}?sun=${sunSelect.value}&water=${waterSelect.value}&pets=${petsSelect.value}`;
    const data = await fetchData(url);
    return renderCards(data);
  } catch {
    return insertErrorMessage(results);
  };
};

function renderCards(data) {
  let cards = `
  <div class="resultsSection__container__foundResults">
    ${heading()}
    <div class="resultsSection__container__foundResults__resultsContainer">
      ${plantCards(data)}
    </div>
    ${returnButton()}
  </div>
  `;
  let parsedCards = htmlElementParser(cards);
  insertHTML(results, parsedCards);
  return document.getElementById('returnButton').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};

function plantCards(data) {
  let favorite = '';
  let regular = '';
  data.map(function (el) {
    return el.staff_favorite ? favorite += plantCard(el, cardType.FAVORITE) : regular += plantCard(el, cardType.REGULAR);
  });
  return favorite += regular;
};