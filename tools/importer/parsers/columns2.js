/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Expecting exactly two columns for this layout
  if (columns.length < 2) return;

  // Left column: heading + paragraph
  const leftCol = columns[0];
  // Right column: button group
  const rightCol = columns[1];

  // Table header row
  const headerRow = ['Columns (columns2)'];

  // Table content row: each column as a cell
  // Use the actual elements for resilience
  const contentRow = [leftCol, rightCol];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
