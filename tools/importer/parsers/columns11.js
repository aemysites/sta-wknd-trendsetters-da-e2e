/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children divs of a container
  function getDirectDivs(parent) {
    return Array.from(parent.children).filter((el) => el.tagName === 'DIV');
  }

  // Find the main grid layout for the top text section
  const container = element.querySelector('.container');
  const topGrid = container && container.querySelector('.grid-layout.tablet-1-column');
  const topGridDivs = topGrid ? getDirectDivs(topGrid) : [];

  // Left column: Eyebrow + Headline
  let leftCol = null;
  if (topGridDivs[0]) {
    leftCol = topGridDivs[0]; // Contains eyebrow and h1
  }

  // Right column: Paragraph, author info, button
  let rightCol = null;
  if (topGridDivs[1]) {
    rightCol = topGridDivs[1]; // Contains paragraph, author info, button
  }

  // Find the lower grid with images
  const bottomGrid = container && container.querySelector('.grid-layout.mobile-portrait-1-column');
  const bottomGridDivs = bottomGrid ? getDirectDivs(bottomGrid) : [];

  // Images: extract the actual <img> elements for both columns
  const img1 = bottomGridDivs[0] && bottomGridDivs[0].querySelector('img') ? bottomGridDivs[0].querySelector('img') : null;
  const img2 = bottomGridDivs[1] && bottomGridDivs[1].querySelector('img') ? bottomGridDivs[1].querySelector('img') : null;

  // Compose top row: left (headline/eyebrow), right (paragraph+author+button)
  let rightColContent = [];
  if (rightCol) {
    // Paragraph
    const paragraph = rightCol.querySelector('.rich-text p');
    if (paragraph) rightColContent.push(paragraph);
    // Author info (avatar, name, date, read time)
    const authorBlock = rightCol.querySelector('.w-layout-grid .flex-horizontal.y-center');
    if (authorBlock) {
      rightColContent.push(authorBlock);
    }
    // Button
    const button = rightCol.querySelector('a.button');
    if (button) rightColContent.push(button);
  }

  // Table header
  const headerRow = ['Columns block (columns11)'];

  // Table second row: left (headline), right (paragraph+author+button)
  const secondRow = [leftCol, rightColContent];

  // Table third row: left (image1), right (image2)
  const thirdRow = [img1, img2];

  // Build table
  const cells = [
    headerRow,
    secondRow,
    thirdRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
