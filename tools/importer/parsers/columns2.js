/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Columns block (columns2)'];

  // 2. Find the main grid
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // 3. Find the left column (main feature)
  const leftCol = grid.children[0];

  // 4. Find the right column (vertical stack)
  const rightColStack = grid.children[1];

  // 5. Find the bottom column (vertical stack)
  const bottomColStack = grid.children[2];

  // Defensive: ensure all columns exist
  if (!leftCol || !rightColStack || !bottomColStack) return;

  // Compose left column cell (main feature)
  const leftCell = leftCol;

  // Compose right column cell (two stacked features)
  const rightColLinks = getDirectChildren(rightColStack, 'a.utility-link-content-block');

  // Compose third column cell (vertical stack of links)
  const thirdColLinks = getDirectChildren(bottomColStack, 'a.utility-link-content-block');

  // Compose rows: first row is leftCol, first rightCol link, first thirdCol link
  // then, for each additional rightCol/thirdCol link, add a new row with only filled columns (no empty columns)
  const rows = [];
  const maxRows = Math.max(rightColLinks.length, thirdColLinks.length);
  for (let i = 0; i < maxRows; i++) {
    const row = [];
    if (i === 0) row.push(leftCell);
    if (rightColLinks[i]) row.push(rightColLinks[i]);
    if (thirdColLinks[i]) row.push(thirdColLinks[i]);
    if (row.length > 0) rows.push(row);
  }

  const cells = [headerRow, ...rows];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
