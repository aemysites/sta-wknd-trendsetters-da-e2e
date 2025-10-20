/* global WebImporter */
export default function parse(element, { document }) {
  // Find the top content grid (headline/summary/author/button)
  const topGrid = element.querySelector('.grid-layout.tablet-1-column');
  let leftColContent = [];
  let rightColContent = [];
  if (topGrid) {
    const topGridChildren = topGrid.querySelectorAll(':scope > div');
    if (topGridChildren[0]) leftColContent.push(topGridChildren[0]);
    if (topGridChildren[1]) rightColContent.push(topGridChildren[1]);
  }

  // Find the images grid (two images side by side)
  const imageGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  let imageCol1 = [];
  let imageCol2 = [];
  if (imageGrid) {
    const imageDivs = imageGrid.querySelectorAll(':scope > div');
    if (imageDivs[0]) {
      const img1 = imageDivs[0].querySelector('img');
      if (img1) imageCol1.push(img1);
    }
    if (imageDivs[1]) {
      const img2 = imageDivs[1].querySelector('img');
      if (img2) imageCol2.push(img2);
    }
  }

  // Table header
  const headerRow = ['Columns (columns11)'];
  // Second row: headline/summary
  const secondRow = [leftColContent, rightColContent];
  // Third row: images
  const thirdRow = [imageCol1, imageCol2];

  const cells = [
    headerRow,
    secondRow,
    thirdRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
