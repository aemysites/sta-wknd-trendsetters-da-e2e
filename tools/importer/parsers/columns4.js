/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Prepare the header row
  const headerRow = ['Columns block (columns4)'];

  // Second row: each column's content as a cell, referencing the actual elements
  const columnsRow = columns.map((col) => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
