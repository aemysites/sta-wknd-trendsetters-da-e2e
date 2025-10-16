/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row for the block name
  const headerRow = ['Columns block (columns28)'];

  // 2. Get the immediate grid children (columns)
  // Defensive: Find the grid layout div
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get direct children of the grid (should be two: content and image)
  const cols = Array.from(grid.children);

  // 3. Left column: all text and button
  const leftCol = cols.find((col) => col.querySelector('h2, .h1-heading'));
  // 4. Right column: image
  const rightCol = cols.find((col) => col.tagName === 'IMG');

  // Defensive: If not found, fallback to first/second
  const leftCell = leftCol || cols[0];
  const rightCell = rightCol || cols[1];

  // 5. Build the table rows
  const rows = [
    headerRow,
    [leftCell, rightCell]
  ];

  // 6. Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // 7. Replace the original element
  element.replaceWith(block);
}
