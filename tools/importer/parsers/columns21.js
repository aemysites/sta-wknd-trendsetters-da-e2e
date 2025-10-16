/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns21)'];

  // Each column is a cell in the second row, referencing the actual DOM nodes
  const contentRow = columns.map((col) => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
