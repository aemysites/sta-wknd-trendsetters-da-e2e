/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero38)'];

  // 2. Background image row (none in this example)
  const bgImageRow = [''];

  // 3. Content row: headline, subheading, CTA
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  let headline, subheading, cta;

  if (grid) {
    // The first child div contains headline and subheading
    const textDiv = grid.querySelector('div');
    if (textDiv) {
      headline = textDiv.querySelector('h2');
      subheading = textDiv.querySelector('p');
    }
    // The anchor is the CTA
    cta = grid.querySelector('a');
  }

  // Compose the content cell
  const contentCell = [];
  if (headline) contentCell.push(headline);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // Table rows
  const rows = [
    headerRow,
    bgImageRow,
    [contentCell]
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
