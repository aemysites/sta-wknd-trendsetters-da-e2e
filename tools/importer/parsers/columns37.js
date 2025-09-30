/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (where columns are)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Build the header row
  const headerRow = ['Columns (columns37)'];

  // Build the columns row
  // Each cell should reference the actual DOM node (not clone, not string)
  const columnsRow = columns.map((col) => col);

  // Compose the table data
  const tableData = [
    headerRow,
    columnsRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
