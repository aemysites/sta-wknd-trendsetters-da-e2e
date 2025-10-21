/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row for Columns block (columns8)
  const headerRow = ['Columns block (columns8)'];

  // Find the grid container (the actual columns wrapper)
  const grid = element.querySelector('.w-layout-grid');
  let leftCol = null, rightCol = null;

  if (grid) {
    // The first child is the heading (left column)
    leftCol = grid.children[0];
    // The second child is the right column (contains paragraph and button)
    rightCol = grid.children[1];
  } else {
    // Fallback: If grid not found, try to find columns manually
    const children = Array.from(element.children);
    leftCol = children[0];
    rightCol = children[1];
  }

  // Defensive: If leftCol or rightCol is missing, use empty divs
  if (!leftCol) leftCol = document.createElement('div');
  if (!rightCol) rightCol = document.createElement('div');

  // For rightCol, preserve all its children (paragraph and button)
  // If rightCol is a container, reference its children; otherwise, reference itself
  let rightColContent = [];
  if (rightCol && rightCol.children && rightCol.children.length > 0) {
    rightColContent = Array.from(rightCol.children);
  } else if (rightCol) {
    rightColContent = [rightCol];
  }

  // Compose the columns row: left is heading, right is paragraph + button
  const columnsRow = [leftCol, rightColContent];

  // Compose the table rows
  const rows = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
