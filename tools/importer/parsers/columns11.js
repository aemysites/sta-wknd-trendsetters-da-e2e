/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const mainContainer = element.querySelector('.container') || element;

  // Find the first grid-layout (headline/desc/author/button)
  const grids = Array.from(mainContainer.querySelectorAll(':scope > .w-layout-grid.grid-layout'));
  const topGrid = grids[0];
  const headlineSection = topGrid?.children[0];
  const rightSection = topGrid?.children[1];

  // --- Left column content ---
  const leftCol = [];
  const eyebrow = headlineSection?.querySelector('.eyebrow');
  if (eyebrow) leftCol.push(eyebrow);
  const headline = headlineSection?.querySelector('h1');
  if (headline) leftCol.push(headline);

  // --- Right column content ---
  const rightCol = [];
  const desc = rightSection?.querySelector('.rich-text p');
  if (desc) rightCol.push(desc);

  // Author info
  const avatar = rightSection?.querySelector('.avatar img');
  const authorName = rightSection?.querySelector('.paragraph-sm');
  const metaRow = rightSection?.querySelector('.flex-horizontal.y-center.flex-gap-xxs');
  if (avatar || authorName || metaRow) {
    const authorInfo = document.createElement('div');
    if (avatar) authorInfo.appendChild(avatar);
    if (authorName) authorInfo.appendChild(authorName);
    if (metaRow) authorInfo.appendChild(metaRow);
    rightCol.push(authorInfo);
  }
  const button = rightSection?.querySelector('a.button');
  if (button) rightCol.push(button);

  // --- Images row ---
  // Find the image grid by class (not relying on grid order)
  const imageGrid = mainContainer.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let imageCells = [];
  if (imageGrid) {
    imageCells = Array.from(imageGrid.querySelectorAll('.utility-aspect-1x1 img')).map(img => img);
  }
  // Defensive: always two columns, but only add image row if images exist
  if (imageCells.length < 2 && imageCells.length > 0) {
    imageCells = [imageCells[0] || '', imageCells[1] || ''];
  }

  // --- Table Construction ---
  const headerRow = ['Columns block (columns11)'];
  const secondRow = [leftCol, rightCol];

  const cells = [headerRow, secondRow];
  if (imageCells.length === 2) {
    cells.push(imageCells);
  }

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
