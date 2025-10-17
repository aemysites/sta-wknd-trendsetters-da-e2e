/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children of grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting 2 columns (left: text, right: image)
  // Find the text column (usually a div) and the image column (img)
  let textCol = null;
  let imgCol = null;
  gridChildren.forEach(child => {
    if (child.tagName === 'IMG') {
      imgCol = child;
    } else if (child.tagName === 'DIV') {
      textCol = child;
    }
  });

  // Defensive: If not found, fallback to first div and first img
  if (!textCol) {
    textCol = grid.querySelector('div');
  }
  if (!imgCol) {
    imgCol = grid.querySelector('img');
  }

  // Compose the table
  const headerRow = ['Columns block (columns28)'];

  // Second row: left column (all text content), right column (image)
  // For resilience, include the whole textCol div and the imgCol element
  const contentRow = [textCol, imgCol];

  // Build table
  const cells = [
    headerRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
