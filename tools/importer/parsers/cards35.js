/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: 2 columns, multiple rows, each row = [image, text]
  const headerRow = ['Cards (cards35)'];
  const cardDivs = Array.from(element.querySelectorAll('.utility-aspect-1x1'));
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    return [img, '']; // always 2 columns: image, empty text
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
