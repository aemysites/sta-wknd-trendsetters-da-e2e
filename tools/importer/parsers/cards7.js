/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block: 2 columns, multiple rows, each row = [image, text]
  const headerRow = ['Cards (cards7)'];

  // Get all card containers (each card is a .utility-aspect-1x1 div)
  const cardDivs = Array.from(element.querySelectorAll('.utility-aspect-1x1'));

  // For each card, extract image and add empty string for text column
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (img) {
      return [img, '']; // two columns: image, empty text
    }
    return null;
  }).filter(Boolean);

  // Assemble table data
  const tableData = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with block table
  element.replaceWith(block);
}
