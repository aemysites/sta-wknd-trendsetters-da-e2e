/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  const getDirectChildren = (parent, selector) => {
    return Array.from(parent.querySelectorAll(`:scope > ${selector}`));
  };

  // 1. Header row
  const headerRow = ['Columns (columns11)'];

  // 2. Find the main content columns
  const containers = getDirectChildren(element, 'div.container');
  let mainGrid, imagesGrid;
  if (containers.length) {
    const grids = containers[0].querySelectorAll('.grid-layout');
    mainGrid = grids[0]; // headline/desc/author/button
    imagesGrid = grids[1]; // two images
  }

  let leftCol, rightCol;
  if (mainGrid) {
    const mainGridChildren = getDirectChildren(mainGrid, 'div');
    leftCol = mainGridChildren[0];
    rightCol = mainGridChildren[1];
  }

  let imgCol1, imgCol2;
  if (imagesGrid) {
    const imageDivs = getDirectChildren(imagesGrid, 'div.utility-aspect-1x1');
    imgCol1 = imageDivs[0];
    imgCol2 = imageDivs[1];
  }

  // Only add rows if both cells are present (avoid undefined)
  const rows = [headerRow];
  if (leftCol && rightCol) {
    rows.push([leftCol, rightCol]);
  }
  if (imgCol1 && imgCol2) {
    rows.push([imgCol1, imgCol2]);
  }

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
