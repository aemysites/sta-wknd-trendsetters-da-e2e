/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // Defensive: expect two columns (image, text)
  let leftCol, rightCol;
  if (columns.length === 2) {
    [leftCol, rightCol] = columns;
  } else {
    // fallback: try to find image and text manually
    leftCol = grid.querySelector('img');
    rightCol = Array.from(grid.children).find(c => c !== leftCol);
  }

  // Left column: image element
  let leftContent = leftCol;
  // Defensive: ensure it's an image
  if (leftCol && leftCol.tagName !== 'IMG') {
    leftContent = leftCol.querySelector('img') || leftCol;
  }

  // Right column: all text content (eyebrow, tag, heading, meta)
  let rightContent = rightCol;

  // Table structure
  const headerRow = ['Columns block (columns33)'];
  const contentRow = [leftContent, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
