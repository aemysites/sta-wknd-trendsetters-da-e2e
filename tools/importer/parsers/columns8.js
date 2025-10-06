/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid
  const children = Array.from(grid.children);

  // The left column: heading (h2)
  let leftCol = null;
  let rightCol = null;
  if (children.length === 2) {
    leftCol = children[0];
    rightCol = children[1];
  } else {
    // fallback: try to find h2 and the other content
    leftCol = grid.querySelector('h2');
    rightCol = grid.querySelector('div');
  }

  if (!leftCol || !rightCol) return;

  // For left column: reference the heading element (preserve semantic)
  // For right column: reference all child nodes (preserve formatting)
  const leftContent = leftCol;
  const rightContent = Array.from(rightCol.childNodes).filter((node) => {
    // Remove empty text nodes
    return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
  });

  // Table header row must match block name exactly
  const headerRow = ['Columns (columns8)'];
  const contentRow = [leftContent, rightContent];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
