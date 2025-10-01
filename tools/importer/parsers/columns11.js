/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // Find the main grid (2-column layout at the top)
  const container = element.querySelector('.container');
  if (!container) return;
  const grids = container.querySelectorAll('.w-layout-grid.grid-layout');
  if (!grids.length) return;

  // The first grid is the 2-column headline/intro area
  const mainGrid = grids[0];
  const mainGridChildren = getDirectChildren(mainGrid, 'div');

  // Left column: headline and eyebrow
  const leftCol = mainGridChildren[0];
  // Right column: intro, author, cta
  const rightCol = mainGridChildren[1];

  // --- LEFT COLUMN ---
  // Eyebrow and headline
  const leftColContent = [];
  if (leftCol) {
    const eyebrow = leftCol.querySelector('.eyebrow');
    if (eyebrow) leftColContent.push(eyebrow);
    const h1 = leftCol.querySelector('h1');
    if (h1) leftColContent.push(h1);
  }

  // --- RIGHT COLUMN ---
  const rightColContent = [];
  if (rightCol) {
    // Paragraph
    const intro = rightCol.querySelector('.rich-text');
    if (intro) rightColContent.push(intro);
    // Author info (avatar, name, date, read time)
    const authorGrid = rightCol.querySelector('.w-layout-grid.grid-layout');
    if (authorGrid) {
      // Only the author info (not the CTA)
      const authorRow = authorGrid.querySelector('.flex-horizontal.y-center.flex-gap-xs');
      if (authorRow) {
        rightColContent.push(authorRow);
      }
      // CTA (Read more button)
      const cta = authorGrid.querySelector('a.button');
      if (cta) rightColContent.push(cta);
    }
  }

  // --- BOTTOM GRID (IMAGES) ---
  // This is the second .w-layout-grid.grid-layout under the main container (not the author one)
  // It is outside the mainGrid, but inside the container
  let bottomGrid = null;
  const allGrids = container.querySelectorAll('.w-layout-grid.grid-layout');
  if (allGrids.length > 1) {
    // The last grid is the images grid
    bottomGrid = allGrids[allGrids.length - 1];
  }
  const bottomGridImages = [];
  if (bottomGrid) {
    // Each child is a .utility-aspect-1x1 containing an img
    const imageDivs = getDirectChildren(bottomGrid, 'div');
    imageDivs.forEach(div => {
      const img = div.querySelector('img');
      if (img) bottomGridImages.push(img);
    });
  }

  // --- BUILD TABLE ---
  // Header row
  const headerRow = ['Columns block (columns11)'];

  // Second row: left and right columns
  const secondRow = [
    leftColContent,
    rightColContent
  ];

  // Third row: images (must have same number of columns as second row)
  let thirdRow = null;
  if (bottomGridImages.length) {
    // Always create a row with two columns
    thirdRow = [
      bottomGridImages[0] || '',
      bottomGridImages[1] || ''
    ];
  }

  // Compose rows
  const rows = [headerRow, secondRow];
  if (thirdRow && (thirdRow[0] || thirdRow[1])) {
    // Only push if at least one image exists
    rows.push(thirdRow);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
