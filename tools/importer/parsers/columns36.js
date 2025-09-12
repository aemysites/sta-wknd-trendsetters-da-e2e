/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container (columns)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (should be two: left content, right images)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: heading, subheading, buttons
  const leftCol = columns[0];

  // Right column: contains another grid of images
  const rightCol = columns[1];
  const imagesGrid = rightCol.querySelector('.w-layout-grid');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Compose the second row: left column (content), right columns (images)
  const secondRow = [leftCol, ...images];

  // Table structure: header row, then content row
  const cells = [
    ['Columns block (columns36)'],
    secondRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
