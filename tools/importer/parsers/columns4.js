/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: heading and subheading
  const leftCol = columns[0];
  // Second column: button group
  const rightCol = columns[1];

  // Header row
  const headerRow = ['Columns block (columns4)'];

  // Content row: left and right columns
  const contentRow = [leftCol, rightCol];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
