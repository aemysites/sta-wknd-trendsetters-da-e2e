/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two: left content, right image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: all content (text, heading, button)
  const leftCol = columns[0];
  // Second column: image
  const rightCol = columns[1];

  // Header row for the block
  const headerRow = ['Columns block (columns27)'];

  // Second row: columns content
  const secondRow = [leftCol, rightCol];

  // Build the table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
