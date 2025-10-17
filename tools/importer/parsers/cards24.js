/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards24) block: 2 columns, multiple rows, header row is block name
  // Source HTML: single card, image + heading (no description, no CTA)

  // 1. Find the card container (the deepest .card or .card-body)
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    cardBody = element.querySelector('.card');
  }
  if (!cardBody) {
    cardBody = element;
  }

  // 2. Extract image (mandatory, first cell)
  const img = cardBody.querySelector('img');

  // 3. Extract title (optional, second cell)
  let title = cardBody.querySelector('.h4-heading');
  if (!title) {
    title = cardBody.querySelector('h4, strong');
  }

  // 4. Extract overlay text ('PARTY NIGHTS TREND ON') if present anywhere in the element
  let overlayText = '';
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
  while (walker.nextNode()) {
    const txt = walker.currentNode.textContent.trim();
    if (/party nights trend on/i.test(txt)) {
      overlayText = txt;
      break;
    }
  }

  // 5. Compose text cell: title + overlay text
  const textCell = [];
  if (title) {
    const strong = document.createElement('strong');
    strong.textContent = title.textContent;
    textCell.push(strong);
  }
  if (overlayText) {
    const p = document.createElement('p');
    p.textContent = overlayText;
    textCell.push(p);
  }

  // 6. Build table rows
  const headerRow = ['Cards (cards24)'];
  const cardRow = [img, textCell];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cardRow,
  ], document);

  element.replaceWith(table);
}
