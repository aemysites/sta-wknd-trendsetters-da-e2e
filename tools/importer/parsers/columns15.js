/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns15)'];

  // Defensive: find the grid-layout container (should be only one)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (each is a column)
  const columns = Array.from(grid.querySelectorAll(':scope > div'));

  // Compose the second row: each cell is the content of a column
  // Use the entire column div for resilience
  const secondRow = columns.map(col => col);

  // Compose the table data
  const cells = [headerRow, secondRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
