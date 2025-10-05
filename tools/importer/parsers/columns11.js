/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two main grid sections
  const grids = element.querySelectorAll('.w-layout-grid.grid-layout');
  if (grids.length < 2) return;

  // --- HEADER ROW ---
  const headerRow = ['Columns (columns11)'];

  // --- SECOND ROW: 2 columns ---
  // Left column: headline, eyebrow, intro, author, button
  const leftCol = document.createElement('div');
  {
    // Eyebrow
    const eyebrow = grids[0].querySelector('.eyebrow');
    if (eyebrow) leftCol.appendChild(eyebrow.cloneNode(true));
    // Headline
    const headline = grids[0].querySelector('h1');
    if (headline) leftCol.appendChild(headline.cloneNode(true));
    // Intro paragraph
    const intro = grids[0].querySelector('.rich-text');
    if (intro) leftCol.appendChild(intro.cloneNode(true));
    // Author block
    const authorBlock = grids[0].querySelector('.avatar');
    if (authorBlock) {
      const authorImg = authorBlock.querySelector('img');
      if (authorImg) leftCol.appendChild(authorImg.cloneNode(true));
      const authorName = authorBlock.parentElement.querySelector('.paragraph-sm:not(.utility-text-secondary)');
      if (authorName) leftCol.appendChild(authorName.cloneNode(true));
      const authorMeta = authorBlock.parentElement.querySelector('.flex-horizontal.y-center.flex-gap-xxs');
      if (authorMeta) leftCol.appendChild(authorMeta.cloneNode(true));
    }
    // Button
    const button = grids[0].querySelector('a.button');
    if (button) leftCol.appendChild(button.cloneNode(true));
  }

  // Right column: all images grouped as a single column (side by side layout)
  const rightCol = document.createElement('div');
  const imageDivs = Array.from(grids[1].querySelectorAll('.utility-aspect-1x1 img'));
  imageDivs.forEach(img => {
    rightCol.appendChild(img.cloneNode(true));
  });

  // Compose the second row with two columns: leftCol and rightCol
  const secondRow = [leftCol, rightCol];

  // --- TABLE ASSEMBLY ---
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
