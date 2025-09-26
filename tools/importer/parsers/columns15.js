/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Table header row
  const headerRow = ['Columns block (columns15)'];

  // Second row: each column's content as a cell
  // Use the entire column element as the cell content for resilience
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
