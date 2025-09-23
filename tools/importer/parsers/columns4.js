/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns root)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each is a column)
  const columns = Array.from(grid.children);

  // Defensive: Only proceed if we have at least one column
  if (columns.length === 0) return;

  // Table header row
  const headerRow = ['Columns block (columns4)'];

  // Second row: each column's content in a cell
  // We reference the entire column element for resilience
  const columnsRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
