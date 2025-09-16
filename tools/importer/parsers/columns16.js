/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find main grid columns
  const mainGrids = element.querySelectorAll(':scope > div');
  if (!mainGrids || mainGrids.length < 2) return;

  // First grid: left (headline) and right (intro + author + button)
  const topGrid = mainGrids[0].querySelector('.w-layout-grid.grid-layout');
  const topColumns = topGrid ? topGrid.children : [];

  // Left column: headline block
  let leftColContent = null;
  if (topColumns.length > 0) {
    leftColContent = topColumns[0];
  }

  // Right column: intro, author, button
  let rightColContent = document.createElement('div');
  if (topColumns.length > 1) {
    const rightCol = topColumns[1];
    // Get intro paragraph
    const intro = rightCol.querySelector('.rich-text.paragraph-lg');
    if (intro) rightColContent.appendChild(intro);
    // Get author row
    const authorRow = rightCol.querySelector('.w-layout-grid.grid-layout');
    if (authorRow) rightColContent.appendChild(authorRow);
  }

  // Second grid: images
  const bottomGrid = mainGrids[1].querySelector('.w-layout-grid.grid-layout');
  let img1 = null, img2 = null;
  if (bottomGrid) {
    const imgDivs = bottomGrid.querySelectorAll('.utility-aspect-1x1');
    if (imgDivs.length > 0) {
      img1 = imgDivs[0].querySelector('img');
    }
    if (imgDivs.length > 1) {
      img2 = imgDivs[1].querySelector('img');
    }
  }

  // Build table rows
  const headerRow = ['Columns block (columns16)'];
  const contentRow = [
    leftColContent,
    rightColContent
  ];
  const imagesRow = [];
  if (img1 || img2) {
    if (img1) imagesRow.push(img1); else imagesRow.push('');
    if (img2) imagesRow.push(img2); else imagesRow.push('');
  }

  // Only add imagesRow if it contains at least one image
  const cells = imagesRow.length > 0 ? [headerRow, contentRow, imagesRow] : [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
