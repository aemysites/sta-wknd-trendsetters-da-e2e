/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns37)'];

  // Defensive: Find the grid layout container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (each column)
  const columns = Array.from(grid.children);

  // Prepare the columns for the block's second row
  // Left column: heading + subheading
  // Right column: CTA button
  let leftCol, rightCol;

  if (columns.length === 2) {
    // Left column: likely contains h2 and p
    leftCol = document.createElement('div');
    Array.from(columns[0].children).forEach(child => leftCol.appendChild(child));

    // Right column: likely contains the button
    rightCol = columns[1]; // anchor element
  } else {
    // Fallback: treat all columns as-is
    leftCol = columns[0] || document.createElement('div');
    rightCol = columns[1] || document.createElement('div');
  }

  // Compose the table rows
  const cells = [
    headerRow,
    [leftCol, rightCol]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
