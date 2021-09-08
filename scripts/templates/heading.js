import pick from '../../images/illustrations/pick.png';

const heading = () => {
  return `
    <div class="resultsSection__container__foundResults__heading">
      <img class="resultsSection__container__foundResults__heading-image" src="${pick}" alt="Pickig leaf Illustration">
      <h1 class="resultsSection__container__foundResults__heading-title">Our picks for you</h1>
    </div>
  `;
};

export default heading;