/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Use all direct children of the grid as columns
    columns = Array.from(grid.children);
  } else {
    // Fallback: Use direct children of container if grid not found
    const container = element.querySelector('.container');
    if (container) {
      columns = Array.from(container.children);
    } else {
      // Fallback: Use direct children of the section
      columns = Array.from(element.children);
    }
  }

  // Table header row: must match block name exactly
  const headerRow = ['Columns block (columns2)'];

  // Second row: each column's content in a cell (reference the actual elements)
  const secondRow = columns.map((col) => col);

  // Compose table data
  const tableData = [headerRow, secondRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
