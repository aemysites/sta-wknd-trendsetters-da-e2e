/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid container for columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Build the header row
  const headerRow = ['Columns block (columns30)'];

  // Build the content row: each column is a cell
  // Reference the entire column element for resilience
  const contentRow = columns.map(col => col);

  // Create the table block
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
