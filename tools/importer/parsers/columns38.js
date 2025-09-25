/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (each is a column)
  const columns = Array.from(grid.children);

  // Prepare the header row
  const headerRow = ['Columns (columns38)'];

  // Prepare the columns row
  const columnsRow = [];

  // For each column, collect its content
  columns.forEach((col) => {
    // If it's a link (e.g., button column)
    if (col.tagName === 'A') {
      columnsRow.push(col);
    } else {
      // Otherwise, collect all children (e.g., heading + subheading)
      // Defensive: if only one child, use that directly
      const children = Array.from(col.childNodes).filter(node => {
        // Only include elements and non-empty text nodes
        return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
      });
      if (children.length === 1) {
        columnsRow.push(children[0]);
      } else {
        columnsRow.push(children);
      }
    }
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
