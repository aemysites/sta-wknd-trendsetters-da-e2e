/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (columns)
  const columns = Array.from(grid.children);

  // Prepare the header row
  const headerRow = ['Columns block (columns38)'];

  // Prepare the second row: each column's content
  const contentRow = columns.map((col) => {
    // If it's a div, include all its children (title, subtitle)
    if (col.tagName === 'DIV') {
      // Get all children (including text nodes)
      return Array.from(col.childNodes);
    }
    // If it's a link/button, include the element itself
    if (col.tagName === 'A') {
      return col;
    }
    // Fallback: include as-is
    return col;
  });

  // Build the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
