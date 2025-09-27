/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required block name as the header row
  const headerRow = ['Columns block (columns4)'];

  // Defensive: Find the grid container (should be the only .grid-layout inside)
  const grid = element.querySelector('.grid-layout');
  let columns = [];
  if (grid) {
    // Get all immediate children of the grid (each is a column)
    const gridChildren = Array.from(grid.children);
    // For each child, collect its content as a single cell
    columns = gridChildren.map((col) => col);
  }

  // Only build the table if we have columns
  if (columns.length > 0) {
    const tableRows = [headerRow, columns];
    const table = WebImporter.DOMUtils.createTable(tableRows, document);
    element.replaceWith(table);
  }
}
