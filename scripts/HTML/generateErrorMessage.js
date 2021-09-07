import HTMLElementParser from '../htmlElementParser';

import noResults from '../../images/illustrations/no-results.png';

export default function generateErrorMessage() {
  let errorMessage = `
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
  return HTMLElementParser(errorMessage);
};