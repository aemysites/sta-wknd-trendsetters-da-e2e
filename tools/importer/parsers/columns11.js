/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the main grid (two columns: left = heading, right = description/meta/button)
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid || mainGrid.children.length < 2) return;

  // Left column: heading/eyebrow
  const leftCol = mainGrid.children[0];
  // Right column: description, meta, button
  const rightCol = mainGrid.children[1];

  // Find the image grid (two images below)
  const imageGrid = container.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let img1 = null, img2 = null;
  if (imageGrid) {
    const imgDivs = imageGrid.querySelectorAll('.utility-aspect-1x1');
    if (imgDivs[0]) img1 = imgDivs[0].querySelector('img');
    if (imgDivs[1]) img2 = imgDivs[1].querySelector('img');
  }

  // Compose the header row
  const headerRow = ['Columns block (columns11)'];

  // Compose the second row (main columns)
  const row1 = [leftCol, rightCol];

  // Compose the third row (images)
  const row2 = [];
  if (img1) row2.push(img1);
  if (img2) row2.push(img2);
  // Pad image row to match number of columns in row1
  while (row2.length < row1.length) row2.push('');

  // Only include non-empty rows
  const tableRows = [headerRow, row1];
  if (row2.some(cell => cell && (typeof cell === 'string' ? cell.trim() : true))) {
    tableRows.push(row2);
  }

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
