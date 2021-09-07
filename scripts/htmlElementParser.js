export default function HTMLElementParser(element) {
  let parsedElement = new DOMParser().parseFromString(element, 'text/html');
  return parsedElement.body.firstElementChild
};