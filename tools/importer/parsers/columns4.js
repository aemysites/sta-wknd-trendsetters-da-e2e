/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout div (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Only proceed if there are columns
  if (!columns.length) return;

  // Table header row (per spec)
  const headerRow = ['Columns block (columns4)'];

  // Second row: one cell per column, referencing the original column elements
  const contentRow = columns.map((col) => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
