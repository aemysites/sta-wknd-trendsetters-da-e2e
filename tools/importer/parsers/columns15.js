/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns15)'];

  // Defensive: Find the main grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children (columns) of the grid
  const columns = Array.from(grid.children);

  // Prepare the second row: one cell per column
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
