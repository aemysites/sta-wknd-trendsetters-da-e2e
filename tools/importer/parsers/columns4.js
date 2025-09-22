/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Only proceed if there are at least two columns
  if (columns.length < 2) return;

  // Table header row
  const headerRow = ['Columns block (columns4)'];

  // Table content row: each column's content in a cell
  const contentRow = columns.map((col) => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
