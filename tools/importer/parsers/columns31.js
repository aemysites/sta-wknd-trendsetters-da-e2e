/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (each column)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Prepare header row
  const headerRow = ['Columns block (columns31)'];

  // Prepare content row: each cell is the content of a column
  // Reference the whole column element for resilience
  const contentRow = columns.map((col) => col);

  // Build table cells array
  const cells = [headerRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
