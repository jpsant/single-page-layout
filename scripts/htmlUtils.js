function htmlElementParser(element) {
  let parsedElement = new DOMParser().parseFromString(element, 'text/html');
  return parsedElement.body.firstElementChild;
};

function insertHTML(container, element) {
  container.innerHTML = '';
  container.appendChild(element);
};

export { htmlElementParser, insertHTML };