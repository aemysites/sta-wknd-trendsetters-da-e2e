/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns block (columns11)'];

  // Find the main grid that contains the two main columns (headline/eyebrow and right content)
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  let leftCol, rightCol;
  if (mainGrid) {
    const mainGridChildren = mainGrid.querySelectorAll(':scope > div');
    leftCol = mainGridChildren[0]; // headline/eyebrow
    rightCol = mainGridChildren[1]; // text, author, button
  }

  // Find the grid that contains the two images
  const imageGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  let imgCol1, imgCol2;
  if (imageGrid) {
    const imageDivs = imageGrid.querySelectorAll(':scope > div');
    imgCol1 = imageDivs[0];
    imgCol2 = imageDivs[1];
  }

  // First content row: left = headline/eyebrow, right = intro/author/button
  const firstContentRow = [
    [leftCol, rightCol]
  ];
  // Second content row: left = first image, right = second image
  const secondContentRow = [
    [imgCol1, imgCol2]
  ];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...firstContentRow,
    ...secondContentRow,
  ], document);

  element.replaceWith(table);
}
