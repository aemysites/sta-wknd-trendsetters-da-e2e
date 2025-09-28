/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Prepare the header row
  const headerRow = ['Columns (columns13)'];

  // Prepare the columns row: reference the actual elements
  const cellsRow = columns.map((col) => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
