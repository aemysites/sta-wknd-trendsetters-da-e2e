/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check for main grid container
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Get direct children of the main grid (should be two: left text, right images)
  const columns = Array.from(mainGrid.children);
  if (columns.length < 2) return;

  // Left column: text content (heading, subheading, buttons)
  const leftCol = columns[0];
  // Right column: images grid
  const rightCol = columns[1];

  // Defensive: get the images grid inside rightCol
  let imagesGrid = rightCol.querySelector('.w-layout-grid');
  if (!imagesGrid) imagesGrid = rightCol;

  // Extract all images as elements
  const imgs = Array.from(imagesGrid.querySelectorAll('img'));

  // Build second row: left cell is leftCol, right cells are each image
  const secondRow = [leftCol, ...imgs];

  // Compose the table
  const cells = [
    ['Columns block (columns36)'],
    secondRow
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
