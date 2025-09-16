/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the direct grid container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Expecting at least 2 columns

  // First column: content block (text, headings, button)
  const leftCol = columns[0];
  // Second column: image
  const rightCol = columns[1];

  // Table header row
  const headerRow = ['Columns block (columns27)'];

  // Table content row: each column as a cell
  const contentRow = [leftCol, rightCol];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
