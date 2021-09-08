import rarely from '../../images/icons/1-drop.svg';
import daily from '../../images/icons/2-drops.svg';
import regularly from '../../images/icons/3-drops.svg';

import lowSun from '../../images/icons/low-sun.svg';
import highSun from '../../images/icons/high-sun.svg';
import noSun from '../../images/icons/no-sun.svg';

import pet from '../../images/icons/pet.svg';
import toxic from '../../images/icons/toxic.svg';

const watering = { 'rarely': rarely, 'daily': daily, 'regularly': regularly };
const sun = { 'high': highSun, 'low': lowSun, 'no': noSun };

const cardType = {
  FAVORITE: 'favorite',
  REGULAR: 'regular',
};

const favoriteDimensions = {
  width: '241',
  height: '316'
}

const regularDimensions = {
  width: '150',
  height: '150'
}

const plantCard = (el, className) => {
  return `
    <div class="${className}">
      <div class="${className}__tag">
        <h3 class="${className}__tag-text">✨ Staff favorite</h3>
      </div>
      <div class="${className}__imageContainer">
        <img class="${className}__imageContainer-image" width="${className === 'favorite' ? favoriteDimensions.width : regularDimensions.width}" height="${className === 'favorite' ? favoriteDimensions.height : regularDimensions.height}" src="${el.url}" alt="${el.name}">
      </div>
      <div style="width: 100%">
        <h3 class="${className}-name">${el.name}</h3>
        <div class="${className}__description">
          <h3 class="${className}__description-price">$${el.price}</h3>
          <div class="${className}__description__icons">
            <img src="${el.toxicity ? toxic : pet}" alt="${el.toxicity ? 'Toxicity icon' : 'Pet icon'}" />
            <img src="${sun[el.sun]}" alt="Sun icon">
            <img src="${watering[el.water]}" alt="Watering level icon">
          </div>
        </div>
      </div>
    </div>
  `;
};

export { plantCard, cardType };