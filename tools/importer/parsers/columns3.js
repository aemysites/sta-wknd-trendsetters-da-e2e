/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (each column)
  const columns = Array.from(grid.children);

  // Defensive: Only proceed if there are columns
  if (columns.length === 0) return;

  // Table header row as required
  const headerRow = ['Columns (columns3)'];

  // Second row: each cell is a column's content
  // Reference the entire column element for resilience
  const contentRow = columns.map(col => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
