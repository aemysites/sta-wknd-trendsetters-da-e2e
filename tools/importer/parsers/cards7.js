/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block: 2 columns, multiple rows, first row is block name
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  // Find all card containers (each card is a .utility-aspect-1x1)
  const cardDivs = element.querySelectorAll('.utility-aspect-1x1');

  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    if (img) {
      // Two columns: image, empty text cell
      rows.push([img, '']);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
