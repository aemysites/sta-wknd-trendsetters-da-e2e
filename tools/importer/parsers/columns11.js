/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main grids: top (text) and bottom (images)
  const mainGrids = element.querySelectorAll('.w-layout-grid.grid-layout');
  const firstGrid = mainGrids[0]; // headline/desc/author/button
  const secondGrid = element.querySelector('.w-layout-grid.mobile-portrait-1-column'); // images

  // --- Header row ---
  const headerRow = ['Columns (columns11)'];

  // --- Top row: left and right columns ---
  // Left: Eyebrow + Headline
  let leftCol = [];
  if (firstGrid && firstGrid.children[0]) {
    const left = firstGrid.children[0];
    const eyebrow = left.querySelector('.eyebrow');
    const headline = left.querySelector('h1');
    if (eyebrow) leftCol.push(eyebrow);
    if (headline) leftCol.push(headline);
  }

  // Right: Paragraph, author, button
  let rightCol = [];
  if (firstGrid && firstGrid.children[1]) {
    const right = firstGrid.children[1];
    const paragraph = right.querySelector('.rich-text');
    if (paragraph) rightCol.push(paragraph);
    // Author row: avatar, name/date/readtime
    const authorRow = right.querySelector('.w-layout-grid .flex-horizontal.y-center.flex-gap-xs');
    if (authorRow) rightCol.push(authorRow);
    // Button
    const button = right.querySelector('a.button');
    if (button) rightCol.push(button);
  }

  // --- Second row: images ---
  let imageCells = [];
  if (secondGrid) {
    const imageDivs = secondGrid.querySelectorAll('.utility-aspect-1x1');
    imageDivs.forEach(div => {
      const img = div.querySelector('img');
      if (img) imageCells.push(img);
    });
  }

  // Compose table rows
  const rows = [
    headerRow,
    [leftCol, rightCol],
    imageCells
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
