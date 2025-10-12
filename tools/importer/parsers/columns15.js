/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns15)'];

  // Find the grid-layout container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: If no columns found, do nothing
  if (!columns.length) return;

  // Each column's content is a single cell in the row
  const columnsRow = columns.map(col => {
    // If the column has only one child, just use that child
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    // Otherwise, use the whole column element
    return col;
  });

  // Compose the table rows
  const tableRows = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
