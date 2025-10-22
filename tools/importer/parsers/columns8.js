/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get direct children of grid (should be two: heading, and right column)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: heading (h2)
  const leftCol = gridChildren[0]; // h2
  // Right column: contains paragraph and button
  const rightCol = gridChildren[1];

  // For right column, collect all its children (paragraph and button)
  const rightColContent = Array.from(rightCol.children);

  // Compose the right column cell: paragraph and button (if present)
  // Keep references to the actual DOM nodes
  const rightCell = document.createElement('div');
  rightColContent.forEach((child) => {
    rightCell.appendChild(child);
  });

  // Table rows
  const headerRow = ['Columns block (columns8)'];
  const contentRow = [leftCol, rightCell];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
