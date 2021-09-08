import { htmlElementParser, insertHTML } from '../htmlUtils';

import loader from '../../images/loader/leaf-loader.svg';

const loadingSpinner = () => {
  return `<img class="loadingSpinner" src='${loader}' width='160' height='160'>`;
};

const insertLoadingSpinner = (container) => {
  const spinner = loadingSpinner();
  const parsedElement = htmlElementParser(spinner);
  insertHTML(container, parsedElement);
};

export default insertLoadingSpinner;