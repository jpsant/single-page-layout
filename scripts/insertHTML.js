export default function insertHTML(container, element) {
  container.innerHTML = '';
  container.appendChild(element);
}