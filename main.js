import errorMessage from './scripts/HTML/generateErrorMessage';
import plantCard from './scripts/HTML/generatePlantCard';
import generateHeading from './scripts/HTML/generateHeading';
import HTMLElementParser from './scripts/htmlElementParser';
import loadingSpinner from './scripts/HTML/generateLoadingSpinner';
import returnButton from './scripts/HTML/generateReturnButton';
import insertHTML from './scripts/insertHTML';

document.getElementById('form').addEventListener('change', fetchData);
document.getElementById('bottomArrow').addEventListener('click', () => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'}) );

const results = document.getElementById('resultsContainer');
const sunSelect = document.getElementById('sun');
const waterSelect = document.getElementById('water');
const petsSelect = document.getElementById('pets');

function generateErrorMessage() {
  const renderedErrorMessage = errorMessage();
  insertHTML(results, renderedErrorMessage);
};

function generateLoadingSpinner() {
  const spinner = loadingSpinner();
  const parsedElement = HTMLElementParser(spinner);
  insertHTML(results, parsedElement);
};

function generateCards(data) {
  let favorite = '';
  let regular = '';
  data.map(function (el) {
    return el.staff_favorite ? favorite += plantCard(el, 'favorite') : regular += plantCard(el, 'item');
  });
  return favorite += regular;
};

async function fetchData() {
  if (sunSelect.value === '' || waterSelect.value === '' || petsSelect.value === '') {
    return;
  }
  generateLoadingSpinner();
  await fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sunSelect.value}&water=${waterSelect.value}&pets=${petsSelect.value}`).then(function(response) {
    return response.json();
  }).then(function(data) {
    renderCards(data);
  }).catch(function() {
    generateErrorMessage();
  });
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
  let parsedCards = HTMLElementParser(cards);
  insertHTML(results, parsedCards);
  document.getElementById('returnButton').addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}) );
};