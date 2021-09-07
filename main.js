import errorMessage from './scripts/HTML/generateErrorMessage';
import plantCard from './scripts/HTML/generatePlantCard';
import generateHeading from './scripts/HTML/generateHeading';
import HTMLElementParser from './scripts/htmlElementParser';

import loader from './images/loader/leaf-loader.svg';
import arrowUp from './images/icons/arrow-up.svg';

document.getElementById('form').addEventListener('change', fetchData);
document.getElementById('bottomArrow').addEventListener('click', () => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'}) );

const results = document.getElementById('resultsContainer');
const sunSelect = document.getElementById('sun');
const waterSelect = document.getElementById('water');
const petsSelect = document.getElementById('pets');

function insertHTML(element) {
  results.innerHTML = '';
  results.appendChild(element);
};

function generateErrorMessage() {
  const renderedErrorMessage = errorMessage();
  insertHTML(renderedErrorMessage);
};

function generateLoadingSpinner() {
  const loadingSpinner = `<img class="loadingSpinner" src='${loader}' width='160' height='160'>`;
  const parsedElement = HTMLElementParser(loadingSpinner);
  insertHTML(parsedElement);
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
    console.log(data);
    renderCards(data);
  }).catch(function(err) {
    console.log(err);
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
    <a id="returnButton" class="resultsSection__container__foundResults__resultsContainer-button" href="#">
      <img src="${arrowUp}" />
      <p>back to the top</p>
    </a>
  </div>
  `;
  let parsedCards = HTMLElementParser(cards);
  insertHTML(parsedCards);
  document.getElementById('returnButton').addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}) );
};