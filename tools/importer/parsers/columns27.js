/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid-layout container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Expect at least 2 columns

  // Table header row
  const headerRow = ['Columns (columns27)'];

  // Table content row: each column is a cell
  // Reference the entire column content for resilience
  const contentRow = columns.map((col) => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
