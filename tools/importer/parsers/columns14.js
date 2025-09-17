/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout that contains the two columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate children of the grid (these are the columns)
  // The first child is the heading, the second is the content column
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Header row
  const headerRow = ['Columns (columns14)'];

  // Second row: each column as a cell
  // Use the full element for each column for resilience
  const contentRow = [columns[0], columns[1]];

  // Build the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
