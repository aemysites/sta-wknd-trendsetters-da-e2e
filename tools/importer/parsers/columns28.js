/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Expecting two columns, but handle any number
  const cells = [];
  // Header row as required
  const headerRow = ['Columns block (columns28)'];
  cells.push(headerRow);

  // Second row: one cell per column
  const contentRow = columns.map((col) => col);
  cells.push(contentRow);

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
