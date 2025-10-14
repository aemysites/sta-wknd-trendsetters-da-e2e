/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns13)'];

  // Defensive: Find the grid layout container (the columns)
  const grid = element.querySelector('.w-layout-grid');
  let leftCol, rightCol;

  if (grid) {
    // Left column: heading (h2)
    leftCol = grid.querySelector('h2');
    // Right column: paragraph + button
    const rightColContainer = grid.querySelector('div');
    let rightColContent = [];
    if (rightColContainer) {
      // Get all children of rightColContainer
      rightColContent = Array.from(rightColContainer.childNodes).filter(node => {
        // Only include elements (p, a, etc.)
        return node.nodeType === Node.ELEMENT_NODE;
      });
    }
    // Build the table rows
    const cells = [
      headerRow,
      [leftCol, rightColContent]
    ];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
