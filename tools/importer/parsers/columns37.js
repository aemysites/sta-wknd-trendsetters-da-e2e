/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns block (columns37)'];

  // Find the main grid container (the columns block)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // The grid has three children:
  // 1. The left column: a large card (anchor) with image, tag, heading, text
  // 2. The right column: a flex-horizontal container with two anchor cards (with images)
  // 3. The right column: a flex-horizontal container with multiple anchor cards (text-only), separated by dividers
  const [leftCol, rightCol1, rightCol2] = grid.children;

  // Defensive: Sometimes rightCol1 and rightCol2 may be grouped in a flex container
  let leftCell, rightCell;

  // Left column: the first anchor (big card)
  leftCell = leftCol;

  // Right column: build a vertical stack of cards
  // rightCol1: a flex-horizontal container with two anchor cards (with images)
  // rightCol2: a flex-horizontal container with multiple anchor cards (text-only), separated by dividers

  // We'll group both rightCol1 and rightCol2 into a single container for the right cell
  const rightCellWrapper = document.createElement('div');
  if (rightCol1) rightCellWrapper.appendChild(rightCol1);
  if (rightCol2) rightCellWrapper.appendChild(rightCol2);

  // Compose the table rows
  const rows = [
    headerRow,
    [leftCell, rightCellWrapper],
  ];

  // Replace the original element with the new table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
