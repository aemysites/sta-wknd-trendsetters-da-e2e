/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the two columns: image and content
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Block header row as specified
  const headerRow = ['Columns (columns1)'];

  // Content row: each cell is the actual column element
  const contentRow = columns;

  // Create the columns table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
