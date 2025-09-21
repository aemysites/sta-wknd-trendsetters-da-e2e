/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid (should be image and content)
  const gridChildren = Array.from(grid.children);

  // Find the image (first column)
  const imgEl = gridChildren.find((el) => el.tagName === 'IMG');

  // Find the content column (second column)
  const contentCol = gridChildren.find((el) => el !== imgEl);

  // Defensive: If missing required columns, abort
  if (!imgEl || !contentCol) return;

  // Use the required header row
  const headerRow = ['Columns (columns33)'];

  // Second row: columns side by side
  const secondRow = [imgEl, contentCol];

  // Compose table cells
  const cells = [headerRow, secondRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
