/* global WebImporter */
export default function parse(element, { document }) {
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the top grid (headline/eyebrow and description/author/button)
  const topGrid = container.querySelector('.grid-layout.tablet-1-column');
  // Find the bottom grid (images)
  const bottomGrid = container.querySelector('.grid-layout.mobile-portrait-1-column');
  if (!topGrid || !bottomGrid) return;

  // Get left and right columns from the top grid
  const topCols = topGrid.querySelectorAll(':scope > div');
  if (topCols.length < 2) return;

  // Clone to detach from DOM
  const leftCol = topCols[0].cloneNode(true);
  const rightCol = topCols[1].cloneNode(true);

  // Get images from the bottom grid
  const bottomImgs = bottomGrid.querySelectorAll('img');
  // Defensive: always provide two cells
  const imgCell1 = bottomImgs[0] ? bottomImgs[0].cloneNode(true) : '';
  const imgCell2 = bottomImgs[1] ? bottomImgs[1].cloneNode(true) : '';

  // Compose header row
  const headerRow = ['Columns block (columns11)'];
  // Compose content rows
  const row1 = [leftCol, rightCol];
  const row2 = [imgCell1, imgCell2];

  // Build table
  const cells = [headerRow, row1, row2];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
