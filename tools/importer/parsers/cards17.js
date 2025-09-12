/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !document) return;

  // Block header row as required
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Each direct child div is a card
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Each card contains a single image
    const img = cardDiv.querySelector('img');
    if (!img) return; // Defensive: skip if no image
    // There is no text content in the source HTML, but block requires two columns
    // So, add empty string as second cell to ensure two columns per row
    rows.push([img, '']);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
