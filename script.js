import loader from './images/loader/leaf-loader.svg';
import pick from './images/illustrations/pick.png';
import rarely from './images/icons/1-drop.svg';
import daily from './images/icons/2-drops.svg';
import regularly from './images/icons/3-drops.svg';
import lowSun from './images/icons/low-sun.svg';
import noSun from './images/icons/no-sun.svg';
import pet from './images/icons/pet.svg';
import toxic from './images/icons/toxic.svg';

document.getElementById('form').addEventListener('change', toggleResults);
const results = document.getElementById('resultsContainer');
const sun = document.getElementById('sun');
const water = document.getElementById('water');
const pets = document.getElementById('pets');
const watering = {'rarely': rarely, 'daily': daily, 'regularly': regularly};

async function toggleResults() {
  if (sun.value === '' || water.value === '' || pets.value === '') {
    return;
  }
  const loadingSpinner = `<img src='${loader}' width='160' height='160'>`
  let noResults = document.getElementById('noResults');
  results.innerHTML = loadingSpinner;
  await fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun.value}&water=${water.value}&pets=${pets.value}`).then(function(response) {
    return response.json();
  }).then(function(data) {
    data.sort(el => !el.staff_favorite ? 1 : -1);
    renderCards(data);
  }).catch(function() {
    generateErrorMessage();
  });
};

function generateErrorMessage() {
  const errorMessage = `
    <div>
      <h1>No Results found :(.</h1>
    </div>
  `;
  let renderedErrorMessage = HTMLElementParser(errorMessage);
  results.innerHTML = '';
  results.appendChild(renderedErrorMessage.body.firstElementChild);
};

function generateHeading() {
  return `
  <div class="resultsSection__container__foundResults__heading">
    <img src="${pick}" alt="Pickig leaf Illustration">
    <h1>Our picks for you</h1>
  </div>
  `;
};

function generateCards(data) {
  return data.map(function (el) {
    return el.staff_favorite ? 
    `
    <div class="favorite">
      <div class="favorite-image">
        <img width="241" height="316" src="${el.url}" alt="${el.name}">
      </div>
      <h3 class="favorite-name">${el.name}</h3>
      <div class="favorite__description">
        <h3 class="favorite__description-price">$${el.price}</h3>
        <div class="favorite__description__icons">
          ${el.toxicity ? '<img src="' + toxic + '" alt="Toxicity icon">' : '<img src="' + pet + '" alt="Pet icon">'}
          <img src="${el.sun === 'no' ? noSun : lowSun}" alt="Sun icon">
          <img src="${watering[el.water]}" alt="Watering level icon">
        </div>
      </div>
    </div>
    ` :
    `
    <div class="item">
      <div class="item-image">
        <img width="150" height="150" src="${el.url}" alt="${el.name}">
      </div>
      <h3 class="item-name">${el.name}</h3>
      <div class="item__description">
        <h3 class="item__description-price">$${el.price}</h3>
        <div class="item__description__icons">
          ${el.toxicity ? '<img src="' + toxic + '" alt="Toxicity icon">' : '<img src="' + pet + '" alt="Pet icon">'}
          <img src="${el.sun === 'no' ? noSun : lowSun}" alt="Sun icon">
          <img src="${watering[el.water]}" alt="Watering level icon">
        </div>
      </div>
    </div>
    `;
  }).join("");
};

function renderCards(data) {
  let element = `
  <div class="resultsSection__container__foundResults">
    ${generateHeading()}
    <div class="resultsSection__container__foundResults__resultsContainer">
      ${generateCards(data)}
    </div>
  </div>
  `;
  let plants = HTMLElementParser(element);
  results.innerHTML = '';
  results.appendChild(plants.body.firstElementChild);
};

function HTMLElementParser(element) {
  return new DOMParser().parseFromString(element, 'text/html');
};