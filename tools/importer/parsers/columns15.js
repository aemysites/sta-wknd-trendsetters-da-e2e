/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid-layout container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.querySelectorAll(':scope > div'));
  if (columns.length === 0) return;

  // Table header row (block name)
  const headerRow = ['Columns (columns15)'];

  // Second row: each cell is a column's content
  // For resilience, use the entire column element as the cell content
  const contentRow = columns.map(col => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(table);
}
