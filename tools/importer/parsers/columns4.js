/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container (which holds the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Header row as required
  const headerRow = ['Columns (columns4)'];

  // Second row: each column's content (each cell)
  // For this layout, there are two columns: left (heading + subheading), right (buttons)
  // We'll reference the full column content for resilience
  const secondRow = columns.map(col => col);

  // Build the table
  const tableCells = [headerRow, secondRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
