import { htmlElementParser, insertHTML } from '../htmlUtils';

import noResults from '../../images/illustrations/no-results.png';

const createErrorMessage = () => {
  return `
    <div id="noResults" class="resultsSection__container__noResults">
      <div class="resultsSection__container__noResults__textContainer">
        <h1 class="resultsSection__container__noResults__textContainer-title">Sorry, no results found :(</h1>
        <h3 class="resultsSection__container__noResults__textContainer-description">Please, Use the filters above and try again.</h3>
      </div>
      <div class="resultsSection__container__noResults__imgContainer">
        <img src="${noResults}" alt="No results image">
      </div>
    </div>
  `;
};

const insertErrorMessage = (container) => {
  const renderedErrorMessage = createErrorMessage();
  const parsedElement = htmlElementParser(renderedErrorMessage);
  insertHTML(container, parsedElement);
};

export default insertErrorMessage;