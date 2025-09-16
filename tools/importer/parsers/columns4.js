/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Table header row as required
  const headerRow = ['Columns block (columns4)'];

  // Second row: Each column's full content as a cell
  // Reference the entire column element for resilience
  const contentRow = columns.map(col => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
