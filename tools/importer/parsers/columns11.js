/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get direct children divs of a container
  function getDirectDivs(parent) {
    return Array.from(parent.querySelectorAll(':scope > div'));
  }

  // Find the main container (skip section wrapper)
  let container = element.querySelector('.container');
  if (!container) container = element;

  // Top grid: headline/eyebrow left, paragraph/author/button right
  const topGrid = container.querySelector('.grid-layout.tablet-1-column');
  let leftCol, rightCol;
  if (topGrid) {
    const topCols = getDirectDivs(topGrid);
    leftCol = topCols[0];
    rightCol = topCols[1];
  }

  // Left column: Eyebrow + Headline
  let eyebrow, headline;
  if (leftCol) {
    eyebrow = leftCol.querySelector('.eyebrow');
    headline = leftCol.querySelector('h1');
  }

  // Right column: Paragraph, author block, button
  let paragraph, authorBlock, button;
  if (rightCol) {
    paragraph = rightCol.querySelector('.rich-text p');
    // Author block: avatar + name/date/readtime
    const authorRow = rightCol.querySelector('.grid-layout');
    if (authorRow) {
      // Author info is the first flex-horizontal div
      const authorFlex = authorRow.querySelector('.flex-horizontal.y-center');
      if (authorFlex) {
        authorBlock = authorFlex;
      }
      // Button is the anchor with class 'button'
      button = authorRow.querySelector('a.button');
    }
  }

  // Bottom grid: two images
  const bottomGrid = container.querySelector('.grid-layout.mobile-portrait-1-column');
  let img1, img2;
  if (bottomGrid) {
    const imgDivs = getDirectDivs(bottomGrid);
    if (imgDivs[0]) img1 = imgDivs[0].querySelector('img');
    if (imgDivs[1]) img2 = imgDivs[1].querySelector('img');
  }

  // Compose left cell: eyebrow, headline
  const leftCellContent = [];
  if (eyebrow) leftCellContent.push(eyebrow);
  if (headline) leftCellContent.push(headline);

  // Compose right cell: paragraph, author, button
  const rightCellContent = [];
  if (paragraph) rightCellContent.push(paragraph);
  if (authorBlock) rightCellContent.push(authorBlock);
  if (button) rightCellContent.push(button);

  // Build table rows
  const headerRow = ['Columns (columns11)'];
  const firstContentRow = [leftCellContent, rightCellContent];
  const secondContentRow = [];
  if (img1) secondContentRow.push(img1);
  if (img2) secondContentRow.push(img2);
  // Only add the image row if both images are present
  if (secondContentRow.length === 2) {
    const cells = [
      headerRow,
      firstContentRow,
      secondContentRow
    ];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
  } else {
    const cells = [
      headerRow,
      firstContentRow
    ];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
  }
}
