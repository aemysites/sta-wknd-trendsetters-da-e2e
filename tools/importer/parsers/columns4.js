/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: heading + paragraph
  const leftCol = columns[0];
  // Second column: button group
  const rightCol = columns[1];

  // Table header row (block name)
  const headerRow = ['Columns (columns4)'];

  // Second row: two columns, referencing existing elements
  const contentRow = [leftCol, rightCol];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
