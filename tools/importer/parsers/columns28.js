/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting two columns (left: text/button, right: image)
  // Left column: all content except the image
  // Right column: the image
  let leftCol, rightCol;
  if (gridChildren.length === 2) {
    // Find which is image
    if (gridChildren[0].tagName === 'IMG') {
      rightCol = gridChildren[0];
      leftCol = gridChildren[1];
    } else if (gridChildren[1].tagName === 'IMG') {
      leftCol = gridChildren[0];
      rightCol = gridChildren[1];
    } else {
      // Fallback: treat both as content
      leftCol = gridChildren[0];
      rightCol = gridChildren[1];
    }
  } else {
    // Fallback: treat all as one column
    leftCol = grid;
    rightCol = null;
  }

  // Table header row
  const headerRow = ['Columns (columns28)'];

  // Table columns row
  const columnsRow = rightCol ? [leftCol, rightCol] : [leftCol];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
