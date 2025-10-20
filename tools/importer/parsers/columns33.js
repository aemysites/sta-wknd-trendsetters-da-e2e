/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns33)'];

  // Defensive: Find the grid-layout container (the actual columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be [img, content div])
  const columns = Array.from(grid.children);

  // Left column: image
  let leftCol = null;
  for (const col of columns) {
    if (col.tagName === 'IMG') {
      leftCol = col;
      break;
    }
  }

  // Right column: vertical stack of text elements
  let rightCol = null;
  for (const col of columns) {
    if (col !== leftCol) {
      rightCol = col;
      break;
    }
  }

  // Defensive: If missing either column, abort
  if (!leftCol || !rightCol) return;

  // Compose the right column content
  // We'll reference the whole rightCol div for resilience
  // (It contains eyebrow, tag, headline, byline)

  // Table rows
  const rows = [
    headerRow,
    [leftCol, rightCol]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
