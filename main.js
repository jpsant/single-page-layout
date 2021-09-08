import { htmlElementParser, insertHTML } from './scripts/htmlUtils';
import { plantCard, cardType } from './scripts/templates/plantCard';
import insertErrorMessage from './scripts/templates/errorMessage';
import generateHeading from './scripts/templates/heading';
import insertLoadingSpinner from './scripts/templates/loadingSpinner';
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
  insertLoadingSpinner(results);
  try {
    const url = `${baseURL}?sun=${sunSelect.value}&water=${waterSelect.value}&pets=${petsSelect.value}`;
    const data = await fetchData(url);
    renderCards(data);
  } catch (error) {
    insertErrorMessage(results);
    throw new Error(error);
  };
};

function renderCards(data) {
  let cards = `
  <div class="resultsSection__container__foundResults">
    ${generateHeading()}
    <div class="resultsSection__container__foundResults__resultsContainer">
      ${generateCards(data)}
    </div>
    ${returnButton()}
  </div>
  `;
  let parsedCards = htmlElementParser(cards);
  insertHTML(results, parsedCards);
  document.getElementById('returnButton').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};

function generateCards(data) {
  let favorite = '';
  let regular = '';
  data.map(function (el) {
    return el.staff_favorite ? favorite += plantCard(el, cardType.FAVORITE) : regular += plantCard(el, cardType.REGULAR);
  });
  return favorite += regular;
};