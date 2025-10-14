/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: each card = image (left), text (right, empty if no text)
  const headerRow = ['Cards (cards35)'];
  const cardDivs = Array.from(element.querySelectorAll('.utility-aspect-1x1'));
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    return [img, '']; // Two columns: image, empty text
  });
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
