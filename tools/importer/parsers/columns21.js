/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Header row as required
  const headerRow = ['Columns (columns21)'];

  // Second row: each column's content, referencing existing elements
  const secondRow = columns.map(col => {
    // If column has only one child, use that; else, use all children
    const colChildren = Array.from(col.childNodes).filter(
      node => node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())
    );
    if (colChildren.length === 1) {
      return colChildren[0];
    }
    // Wrap multiple nodes in a fragment to preserve all content
    const fragment = document.createDocumentFragment();
    colChildren.forEach(child => fragment.appendChild(child));
    return fragment;
  });

  // Build the table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
