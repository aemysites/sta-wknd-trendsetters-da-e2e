/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns31)'];

  // Defensive: Find the grid container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // For this layout, the left column is the first two elements (name and tags),
  // the right column is the next two elements (heading and rich text)
  // We'll combine the first two into one cell, and the next two into another cell

  // Left column: name + tags
  const leftColEls = columns.slice(0, 2);
  // Create a wrapper div to hold both
  const leftColDiv = document.createElement('div');
  leftColEls.forEach(el => leftColDiv.appendChild(el));

  // Right column: heading + rich text
  const rightColEls = columns.slice(2, 4);
  const rightColDiv = document.createElement('div');
  rightColEls.forEach(el => rightColDiv.appendChild(el));

  // Second row: two columns
  const secondRow = [leftColDiv, rightColDiv];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow
  ], document);

  element.replaceWith(table);
}
