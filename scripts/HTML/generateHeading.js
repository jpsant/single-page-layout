import pick from '../../images/illustrations/pick.png';

export default function generateHeading() {
  return `
    <div class="resultsSection__container__foundResults__heading">
      <img src="${pick}" alt="Pickig leaf Illustration">
      <h1>Our picks for you</h1>
    </div>
  `;
};