/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (columns) container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Build the header row
  const headerRow = ['Columns block (columns31)'];

  // Build the columns row: each cell is the content of a column
  // For each column, preserve all child nodes (including text, elements, lists, headings, etc.)
  const columnsRow = columns.map((col) => {
    // If the column has only one child, just return that
    if (col.childNodes.length === 1) return col.firstChild;
    // Otherwise, return all child nodes as an array
    return Array.from(col.childNodes);
  });

  // Compose the table rows
  const tableRows = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
