import loader from './images/loader/leaf-loader.svg';
import pick from './images/illustrations/pick.png';
import rarely from './images/icons/1-drop.svg';
import daily from './images/icons/2-drops.svg';
import regularly from './images/icons/3-drops.svg';
import lowSun from './images/icons/low-sun.svg';
import highSun from './images/icons/high-sun.svg';
import noSun from './images/icons/no-sun.svg';
import pet from './images/icons/pet.svg';
import toxic from './images/icons/toxic.svg';
import noResults from './images/illustrations/no-results.png';

document.getElementById('form').addEventListener('change', toggleResults);
const results = document.getElementById('resultsContainer');
const sunSelect = document.getElementById('sun');
const waterSelect = document.getElementById('water');
const petsSelect = document.getElementById('pets');
const watering = {'rarely': rarely, 'daily': daily, 'regularly': regularly};
const sun = {'high': highSun, 'low': lowSun, 'no': noSun};

async function toggleResults() {
  if (sunSelect.value === '' || waterSelect.value === '' || petsSelect.value === '') {
    return;
  }
  const loadingSpinner = `<img src='${loader}' width='160' height='160'>`
  results.innerHTML = loadingSpinner;
  await fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sunSelect.value}&water=${waterSelect.value}&pets=${petsSelect.value}`).then(function(response) {
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
  <div id="noResults" class="resultsSection__container__noResults">
    <div class="resultsSection__container__noResults__textContainer">
      <h1>Sorry, no results found :(</h1>
      <h3>Please, Use the filters above and try again.</h3>
    </div>
    <div class="resultsSection__container__noResults__imgContainer">
      <img src="${noResults}" alt="No results image">
    </div>
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
      <div class="favorite__tag">
        <h3 class="favorite__tag-text">✨ Staff favorite</h3>
      </div>
      <div class="favorite-image">
        <img width="241" height="316" src="${el.url}" alt="${el.name}">
      </div>
      <h3 class="favorite-name">${el.name}</h3>
      <div class="favorite__description">
        <h3 class="favorite__description-price">$${el.price}</h3>
        <div class="favorite__description__icons">
          ${el.toxicity ? '<img src="' + toxic + '" alt="Toxicity icon">' : '<img src="' + pet + '" alt="Pet icon">'}
          <img src="${sun[el.sun]}" alt="Sun icon">
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
          <img src="${sun[el.sun]}" alt="Sun icon">
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