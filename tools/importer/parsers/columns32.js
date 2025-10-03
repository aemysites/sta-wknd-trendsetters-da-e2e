/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // The grid has two children: left (text/meta/social) and right (image)
  const gridChildren = Array.from(grid.children);

  // Defensive: Expect two columns
  let leftCol = null;
  let rightCol = null;

  if (gridChildren.length === 2) {
    leftCol = gridChildren[0];
    rightCol = gridChildren[1];
  } else if (gridChildren.length === 1) {
    // Sometimes only one child, which itself contains two columns
    const subChildren = Array.from(gridChildren[0].children);
    if (subChildren.length === 2) {
      leftCol = subChildren[0];
      rightCol = subChildren[1];
    } else {
      leftCol = gridChildren[0];
    }
  }

  // Defensive: If rightCol is missing, try to find an image in the grid
  if (!rightCol) {
    rightCol = grid.querySelector('img');
  }

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns32)'];

  // Table row: two columns
  const row = [];
  row.push(leftCol ? leftCol : '');
  row.push(rightCol ? rightCol : '');

  // Build table
  const cells = [headerRow, row];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(table);
}
