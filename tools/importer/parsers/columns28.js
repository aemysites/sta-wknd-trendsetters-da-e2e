/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid: left column and right column
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: contains all text and button content
  const leftCol = columns[0];

  // Right column: contains the image
  const rightCol = columns[1];

  // Table header row
  const headerRow = ['Columns (columns28)'];

  // Table columns row: left and right
  const columnsRow = [leftCol, rightCol];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
