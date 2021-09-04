import loader from './images/loader/leaf-loader.svg';

document.getElementById('form').addEventListener('change', toggleResults);
const sun = document.getElementById('sun');
const water = document.getElementById('water');
const pets = document.getElementById('pets');

async function toggleResults() {
  if (sun.value === '' || water.value === '' || pets.value === '') {
    return;
  }
  const loadingSpinner = `<img src='${loader}' width='160' height='160'>`
  let results = document.getElementById('resultsContainer');
  let noResults = document.getElementById('noResults');
  results.innerHTML = loadingSpinner;
  await fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun.value}&water=${water.value}&pets=${pets.value}`).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log(data);
    results.innerHTML = '';
    results.appendChild(noResults);
  }).catch(function() {
    console.log("Booo");
    results.innerHTML = '';
    results.appendChild(noResults);
  });
}