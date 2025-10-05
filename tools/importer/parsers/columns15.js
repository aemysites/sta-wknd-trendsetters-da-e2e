/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.querySelectorAll(':scope > div'));
  if (!columns.length) return;

  // Table header row
  const headerRow = ['Columns (columns15)'];

  // Second row: each cell is a column's content
  // For resilience, include the entire column element in each cell
  const columnsRow = columns.map((col) => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
