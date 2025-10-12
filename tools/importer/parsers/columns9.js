/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns9)'];

  // Get the grid layout (the main content area)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Identify the left column (text content)
  const leftCol = gridChildren.find((el) => el.tagName === 'DIV');

  // Identify the right column (contact info list)
  const rightCol = gridChildren.find((el) => el.tagName === 'UL');

  // Identify the image (should be the last child)
  const image = gridChildren.find((el) => el.tagName === 'IMG');

  // Defensive: fallback to empty div if not found
  const leftCell = leftCol || document.createElement('div');
  let rightCell;
  if (rightCol) {
    rightCell = document.createElement('div');
    rightCell.appendChild(rightCol);
    if (image) {
      rightCell.appendChild(image);
    }
  } else {
    rightCell = document.createElement('div');
    if (image) {
      rightCell.appendChild(image);
    }
  }

  // Second row: two columns (text, contact info + image stacked)
  const secondRow = [leftCell, rightCell];

  // Compose the table rows
  const rows = [headerRow, secondRow];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
