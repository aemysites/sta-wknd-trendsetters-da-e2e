/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Columns block (columns11)'];

  // 2. Find main content columns
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.grid-layout.tablet-1-column');
  if (!mainGrid) return;
  const mainCols = Array.from(mainGrid.children).filter(child => child.tagName === 'DIV');
  if (mainCols.length < 2) return;

  // Left column: headline block
  const leftCol = mainCols[0].cloneNode(true);
  // Right column: intro, author, button
  const rightCol = mainCols[1].cloneNode(true);

  // 3. Find image columns (second grid)
  const imageGrid = container.querySelector('.grid-layout.mobile-portrait-1-column');
  if (!imageGrid) return;
  const imageCols = Array.from(imageGrid.children).filter(child => child.tagName === 'DIV');
  if (imageCols.length < 2) return;

  // Each imageCol contains an image
  const img1 = imageCols[0].querySelector('img');
  const img2 = imageCols[1].querySelector('img');

  // Clone the images to avoid moving them from the DOM
  const img1Clone = img1 ? img1.cloneNode(true) : '';
  const img2Clone = img2 ? img2.cloneNode(true) : '';

  // 4. Build the table rows
  const secondRow = [leftCol, rightCol];
  const thirdRow = [img1Clone, img2Clone];

  // 5. Create the table
  const cells = [headerRow, secondRow, thirdRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace the original element
  if (blockTable) {
    element.replaceWith(blockTable);
  }
}
