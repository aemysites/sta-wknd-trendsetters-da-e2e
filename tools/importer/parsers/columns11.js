/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid with two columns (headline/intro and content)
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  let leftCol = '';
  let rightCol = '';

  if (mainGrid) {
    const gridChildren = mainGrid.querySelectorAll(':scope > div');
    // Left column: headline and eyebrow
    if (gridChildren[0]) {
      leftCol = gridChildren[0]; // reference, do not clone
    }
    // Right column: paragraph, author, button, etc
    if (gridChildren[1]) {
      rightCol = gridChildren[1]; // reference, do not clone
    }
  }

  // Find the lower grid with two images
  const imgGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  let img1 = '';
  let img2 = '';
  if (imgGrid) {
    const imgs = imgGrid.querySelectorAll('img');
    if (imgs[0]) img1 = imgs[0]; // reference, do not clone
    if (imgs[1]) img2 = imgs[1]; // reference, do not clone
  }

  // Build table rows
  const headerRow = ['Columns (columns11)'];
  const contentRow = [leftCol, rightCol];
  const imageRow = [img1, img2];

  // Only add image row if both images exist
  const rows = [
    headerRow,
    contentRow,
  ];
  if (img1 && img2) {
    rows.push(imageRow);
  }

  // Create and replace table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
