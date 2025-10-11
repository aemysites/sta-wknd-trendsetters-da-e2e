/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block: 2 columns, multiple rows, each row = [image, text]
  // Header row
  const headerRow = ['Cards (cards7)'];

  // Find all card containers (each card is a direct child div of the grid)
  const cardDivs = Array.from(element.children);

  // For each card, extract the image (first child of card div)
  // Text cell is empty since there's no visible text in the screenshot or HTML
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    return [img, ''];
  });

  // Build table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(table);
}
