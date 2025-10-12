/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the two columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two direct children (columns)
  const columns = Array.from(grid.children);
  if (columns.length !== 2) return;

  // For cleaner output, extract only the contents of each column (not the outer div wrappers)
  function extractChildrenContent(col) {
    const fragment = document.createDocumentFragment();
    Array.from(col.childNodes).forEach(node => fragment.appendChild(node.cloneNode(true)));
    return fragment;
  }

  // Table header row
  const headerRow = ['Columns block (columns32)'];

  // Table content row: two columns, each cell contains only the direct content (not the wrapper div)
  const contentRow = [
    extractChildrenContent(columns[0]),
    extractChildrenContent(columns[1])
  ];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
