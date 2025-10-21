/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: heading and paragraph
  const leftCol = columns[0];
  // Right column: button group
  const rightCol = columns[1];

  // Build the block table
  const headerRow = ['Columns (columns4)'];
  const contentRow = [leftCol, rightCol];

  const cells = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
