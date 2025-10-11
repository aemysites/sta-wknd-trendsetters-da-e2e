/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name for the header row
  const headerRow = ['Columns block (columns8)'];

  // Find the grid-layout container (the actual columns)
  const grid = element.querySelector('.grid-layout');
  let leftCol, rightCol;

  if (grid) {
    // The first child is the heading (left column)
    leftCol = grid.children[0];
    // The second child is the content + button (right column)
    rightCol = grid.children[1];
  } else {
    // Fallback: treat the whole element as a single column
    leftCol = element;
    rightCol = null;
  }

  // For the right column, combine all its children (paragraph and button)
  let rightColContent = [];
  if (rightCol) {
    // Defensive: gather all children
    rightColContent = Array.from(rightCol.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
  }

  // Compose the table rows
  const cells = [
    headerRow,
    [leftCol, rightColContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
