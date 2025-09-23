/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by tag name
  function getDirectChildrenByTag(parent, tag) {
    return Array.from(parent.children).filter(child => child.tagName.toLowerCase() === tag);
  }

  // Find the main container (skip section)
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // Get the first grid (headline/text/author/button)
  const grids = container.querySelectorAll(':scope > .w-layout-grid');
  const mainGrid = grids[0];
  if (!mainGrid) return;

  // Get headline column (left)
  const headlineCol = mainGrid.children[0];
  // Get right column (intro, author, button)
  const rightCol = mainGrid.children[1];

  // Compose left column content
  const eyebrow = headlineCol.querySelector('.eyebrow');
  const headline = headlineCol.querySelector('h1');
  const leftColContent = [];
  if (eyebrow) leftColContent.push(eyebrow);
  if (headline) leftColContent.push(headline);

  // Compose right column content
  const intro = rightCol.querySelector('.rich-text');
  // Author block
  const authorGrid = rightCol.querySelector('.w-layout-grid');
  let authorContent = [];
  if (authorGrid) {
    // Avatar
    const avatarDiv = authorGrid.querySelector('.avatar');
    if (avatarDiv) {
      const avatarImg = avatarDiv.querySelector('img');
      if (avatarImg) authorContent.push(avatarImg);
    }
    // Author name and meta
    const authorInfoDiv = authorGrid.querySelector('div:not(.avatar)');
    if (authorInfoDiv) {
      authorContent.push(authorInfoDiv);
    }
    // Button
    const button = authorGrid.querySelector('a.button');
    if (button) authorContent.push(button);
  }
  // Compose right column
  const rightColArr = [];
  if (intro) rightColArr.push(intro);
  if (authorContent.length) rightColArr.push(...authorContent);

  // Get second grid (images)
  const imageGrid = container.querySelector('.grid-layout.mobile-portrait-1-column');
  let imageCells = [];
  if (imageGrid) {
    const imageDivs = getDirectChildrenByTag(imageGrid, 'div');
    imageCells = imageDivs.map(div => {
      const img = div.querySelector('img');
      return img ? img : null;
    }).filter(Boolean);
  }

  // Build table rows
  const headerRow = ['Columns block (columns11)'];
  // First content row: headline/intro/author/button (2 columns)
  const firstContentRow = [leftColContent, rightColArr];
  // Second content row: images (2 columns)
  const secondContentRow = imageCells.length === 2 ? imageCells : [];

  // Compose cells array
  const cells = [headerRow, firstContentRow];
  if (secondContentRow.length === 2) cells.push(secondContentRow);

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
