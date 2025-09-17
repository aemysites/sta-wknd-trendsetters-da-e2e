/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid layout (these are the columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Compose the header row
  const headerRow = ['Columns (columns31)'];

  // Compose the content row: each cell is the full column element
  const contentRow = columns.map(col => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
