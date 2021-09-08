import arrowUp from '../../images/icons/arrow-up.svg';

const returnButton = () => {
  return `
    <a id="returnButton" class="resultsSection__container__foundResults__resultsContainer__button" href="#">
      <img class="resultsSection__container__foundResults__resultsContainer__button-image" src="${arrowUp}" />
      <p class="resultsSection__container__foundResults__resultsContainer__button-text">back to the top</p>
    </a>
  `;
};
export default returnButton;