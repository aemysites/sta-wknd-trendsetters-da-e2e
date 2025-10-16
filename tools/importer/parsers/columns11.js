/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content grid and the images grid
  const grids = element.querySelectorAll('.w-layout-grid.grid-layout');
  const mainGrid = grids[0];
  const imagesGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');

  // --- LEFT COLUMN (headline, eyebrow) ---
  const leftCol = mainGrid ? mainGrid.children[0] : null;
  let leftColContent = [];
  if (leftCol) {
    const eyebrow = leftCol.querySelector('.eyebrow');
    if (eyebrow) leftColContent.push(eyebrow);
    const h1 = leftCol.querySelector('h1');
    if (h1) leftColContent.push(h1);
  }

  // --- RIGHT COLUMN (desc, author, button) ---
  const rightCol = mainGrid ? mainGrid.children[1] : null;
  let rightColContent = [];
  if (rightCol) {
    const desc = rightCol.querySelector('.rich-text, .w-richtext, p');
    if (desc) rightColContent.push(desc);
    const authorBlock = rightCol.querySelector('.w-layout-grid.grid-layout');
    if (authorBlock) {
      const authorInfo = authorBlock.children[0];
      if (authorInfo) rightColContent.push(authorInfo);
      const cta = authorBlock.querySelector('a.button, a.w-button, button');
      if (cta) rightColContent.push(cta);
    }
  }

  // --- IMAGES ---
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Ensure two columns in every row after header
  const headerRow = ['Columns block (columns11)'];
  const secondRow = [leftColContent, rightColContent];
  let thirdRow = [null, null];
  if (images.length >= 2) {
    thirdRow = [images[0], images[1]];
  } else if (images.length === 1) {
    thirdRow = [images[0], null];
  }

  const tableRows = [headerRow, secondRow, thirdRow];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
