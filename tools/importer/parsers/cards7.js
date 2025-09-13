/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header row as per spec
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  // Each card is a direct child div
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Each cardDiv contains an image (mandatory)
    const img = cardDiv.querySelector('img');
    // Always create a two-column row: image, and empty string for text content
    if (img) {
      rows.push([img, '']);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
