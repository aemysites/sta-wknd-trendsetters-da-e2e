/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout, which contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: if no columns, do nothing
  if (!columns.length) return;

  // Table header row
  const headerRow = ['Columns (columns31)'];

  // Table content row: each cell is a column's content
  // Use the entire column element for each cell for resilience
  const contentRow = columns;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
