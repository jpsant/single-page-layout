import arrowUp from '../../images/icons/arrow-up.svg';

export default function generateReturnButton() {
  return `
    <a id="returnButton" class="resultsSection__container__foundResults__resultsContainer-button" href="#">
      <img src="${arrowUp}" />
      <p>back to the top</p>
    </a>
  `;
};