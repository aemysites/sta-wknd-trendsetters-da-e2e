/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two: left content, right image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: all text and button content
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // Defensive: ensure rightCol is an image
  let rightContent = rightCol;
  if (rightCol.tagName !== 'IMG') {
    // If not an image, try to find image inside
    const img = rightCol.querySelector('img');
    if (img) rightContent = img;
  }

  // Build table rows
  const headerRow = ['Columns block (columns28)'];
  const contentRow = [leftCol, rightContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element with block table
  element.replaceWith(table);
}
