/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting two columns (image, text)
  let imageEl = null;
  let textEl = null;
  gridChildren.forEach((child) => {
    if (child.tagName === 'IMG') {
      imageEl = child;
    } else {
      textEl = child;
    }
  });

  // Ensure both columns exist, fallback to empty cell if missing
  const leftCell = imageEl || document.createElement('div');
  const rightCell = textEl || document.createElement('div');

  // Block header must match spec exactly
  const headerRow = ['Columns block (columns33)'];
  const contentRow = [leftCell, rightCell];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
