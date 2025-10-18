/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children of the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Defensive: Find the text column and image column
  let textCol = null;
  let imgCol = null;
  gridChildren.forEach((child) => {
    if (child.querySelector('h2, .h1-heading')) {
      textCol = child;
    } else if (child.tagName === 'IMG') {
      imgCol = child;
    }
  });

  // Defensive fallback if structure changes
  if (!textCol && gridChildren.length) {
    textCol = gridChildren[0];
  }
  if (!imgCol && gridChildren.length > 1) {
    imgCol = gridChildren[1];
  }

  // Compose left column content: all children of textCol
  const leftContent = [];
  if (textCol) {
    leftContent.push(...Array.from(textCol.children));
  }

  // Compose right column content: image only
  const rightContent = imgCol ? [imgCol] : [];

  // Table structure
  const headerRow = ['Columns (columns28)'];
  const columnsRow = [leftContent, rightContent];

  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
