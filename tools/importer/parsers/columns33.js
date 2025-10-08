/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Expect two columns: left (image), right (content)
  let leftCol = null;
  let rightCol = null;

  gridChildren.forEach((child) => {
    if (child.tagName === 'IMG') {
      leftCol = child;
    } else {
      rightCol = child;
    }
  });

  // Defensive: abort if columns missing
  if (!leftCol || !rightCol) return;

  // Right column: preserve semantic content and structure
  const rightContent = document.createElement('div');
  Array.from(rightCol.childNodes).forEach((node) => {
    rightContent.appendChild(node);
  });

  // Table header row: block name exactly as specified
  const headerRow = ['Columns block (columns33)'];
  // Table content row: [image, content]
  const contentRow = [leftCol, rightContent];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original section element with the block table
  element.replaceWith(table);
}
