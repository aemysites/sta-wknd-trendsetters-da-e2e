/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns4)'];

  // Find the grid layout (the columns)
  const grid = element.querySelector('.grid-layout');
  let columns = [];
  if (grid) {
    // Each direct child of grid is a column
    columns = Array.from(grid.children).map((col) => {
      // If the column has only one child, use it directly
      if (col.children.length === 1) {
        return col.firstElementChild;
      }
      // Otherwise, wrap all children in a fragment
      const frag = document.createDocumentFragment();
      Array.from(col.children).forEach(child => frag.appendChild(child));
      return frag;
    });
  }

  // Defensive fallback: if grid not found, try container direct children
  if (columns.length === 0) {
    const container = element.querySelector('.container');
    if (container) {
      columns = Array.from(container.children).map((col) => {
        if (col.children.length === 1) {
          return col.firstElementChild;
        }
        const frag = document.createDocumentFragment();
        Array.from(col.children).forEach(child => frag.appendChild(child));
        return frag;
      });
    }
  }

  // If still no columns, fallback to empty columns
  if (columns.length === 0) {
    columns = [''];
  }

  // Build table data: header row, then one row with each column's content
  const tableData = [headerRow, columns];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
