/* global WebImporter */
export default function parse(element, { document }) {
  // Always create the header row as specified
  const headerRow = ['Columns (columns11)'];

  // Find the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the two main grids: top (text) and bottom (images)
  const grids = Array.from(container.querySelectorAll(':scope > .w-layout-grid'));
  if (grids.length < 2) return;
  const topGrid = grids[0];
  const bottomGrid = grids[1];

  // --- Top grid: two columns ---
  const topCols = Array.from(topGrid.children);
  if (topCols.length < 2) return;
  const leftCol = topCols[0];
  const rightCol = topCols[1];

  // Left column: eyebrow + headline
  const leftCellContent = document.createElement('div');
  const eyebrow = leftCol.querySelector('.eyebrow');
  if (eyebrow) leftCellContent.appendChild(eyebrow.cloneNode(true));
  const headline = leftCol.querySelector('h1');
  if (headline) leftCellContent.appendChild(headline.cloneNode(true));

  // Right column: intro paragraph + author/meta + button
  const rightCellContent = document.createElement('div');
  const intro = rightCol.querySelector('.rich-text');
  if (intro) rightCellContent.appendChild(intro.cloneNode(true));
  const authorGrid = rightCol.querySelector('.w-layout-grid.grid-layout');
  if (authorGrid) {
    // Avatar
    const avatar = authorGrid.querySelector('.avatar');
    if (avatar) rightCellContent.appendChild(avatar.cloneNode(true));
    // Name
    const name = authorGrid.querySelector('.paragraph-sm:not(.utility-text-secondary)');
    if (name) rightCellContent.appendChild(name.cloneNode(true));
    // Meta info (date, dot, read time)
    const metaDivs = authorGrid.querySelectorAll('.paragraph-sm.utility-text-secondary');
    if (metaDivs.length) {
      const metaSpan = document.createElement('span');
      metaDivs.forEach((div, idx) => {
        metaSpan.appendChild(div.cloneNode(true));
        if (idx < metaDivs.length - 1) metaSpan.appendChild(document.createTextNode(' '));
      });
      rightCellContent.appendChild(metaSpan);
    }
    // Read more button
    const btn = authorGrid.querySelector('a.button');
    if (btn) rightCellContent.appendChild(btn.cloneNode(true));
  }

  // --- Bottom grid: two images ---
  const bottomCols = Array.from(bottomGrid.children);
  const img1 = bottomCols[0] ? bottomCols[0].querySelector('img') : null;
  const img2 = bottomCols[1] ? bottomCols[1].querySelector('img') : null;
  const imgCell1 = document.createElement('div');
  if (img1) imgCell1.appendChild(img1.cloneNode(true));
  const imgCell2 = document.createElement('div');
  if (img2) imgCell2.appendChild(img2.cloneNode(true));

  // Compose table rows
  const secondRow = [leftCellContent, rightCellContent];
  const thirdRow = [imgCell1, imgCell2];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
    thirdRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
