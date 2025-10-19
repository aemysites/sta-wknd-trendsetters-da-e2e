/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards24) block: 2 columns, each row is a card: [image, text]
  // Header row
  const headerRow = ['Cards (cards24)'];

  // Extract image (mandatory, first column)
  const imageEl = element.querySelector('img');

  // Compose text cell: only include heading from HTML
  const textCellContent = [];
  const headingEl = element.querySelector('.h4-heading');
  if (headingEl) {
    textCellContent.push(headingEl);
  }

  // Compose rows
  const rows = [
    headerRow,
    [imageEl, textCellContent]
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
