/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: content block (text, heading, button)
  const leftCol = columns[0];
  // Second column: image
  const rightCol = columns[1];

  // Table header row
  const headerRow = ['Columns block (columns27)'];

  // Table content row: each column as a cell
  const contentRow = [leftCol, rightCol];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
