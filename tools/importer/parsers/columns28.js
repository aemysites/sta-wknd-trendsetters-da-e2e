/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout for columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Defensive: Expect at least 2 columns

  // Left column: all content except image
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // Compose left column content
  // Gather all children of leftCol in order, preserving semantic structure
  const leftColContent = Array.from(leftCol.children);

  // Compose right column content
  // Only reference the image element (never clone or create new)
  let rightColContent = [];
  if (rightCol.tagName === 'IMG') {
    rightColContent = [rightCol];
  } else {
    // Defensive: If not image, gather all child images
    rightColContent = Array.from(rightCol.querySelectorAll('img'));
  }

  // Table construction
  const headerRow = ['Columns block (columns28)']; // CRITICAL: Use block name exactly
  const contentRow = [leftColContent, rightColContent];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
