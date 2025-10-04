/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the footer
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Header row as required
  const headerRow = ['Columns (columns21)'];

  // Second row: reference each column element directly
  const secondRow = columns.map(col => col);

  // Build the table rows
  const rows = [headerRow, secondRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
