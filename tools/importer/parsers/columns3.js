/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid-layout container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Prepare header row
  const headerRow = ['Columns (columns3)'];

  // Prepare content row: each cell is a column's content
  // For resilience, reference the entire column element
  const contentRow = columns.map(col => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
