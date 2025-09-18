/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columnElements = Array.from(grid.children);
  if (columnElements.length === 0) return;

  // Table header row
  const headerRow = ['Columns (columns3)'];

  // Table content row: each column's content is a cell
  const contentRow = columnElements.map((col) => col);

  // Compose table cells
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
