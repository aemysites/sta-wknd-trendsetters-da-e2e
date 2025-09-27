/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Always use the required header row
  const headerRow = ['Columns (columns38)'];

  // For each column, gather its content semantically
  const columnsRow = columns.map((col) => {
    // If the column is a link (e.g., button), use the element itself
    if (col.tagName === 'A') {
      return col;
    }
    // Otherwise, collect all children (preserve heading, subheading, etc.)
    if (col.children.length > 0) {
      return Array.from(col.childNodes).filter(node => {
        // Only include element nodes and non-empty text nodes
        return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
      });
    }
    // Fallback: if empty, include the column itself (could be text node)
    return col;
  });

  // Compose the table data
  const tableData = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original section with the block
  element.replaceWith(block);
}
