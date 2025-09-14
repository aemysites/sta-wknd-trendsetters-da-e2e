/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Columns block (columns11)'];

  // 2. Find the two main column containers (top left+right)
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;
  const mainColumns = getDirectChildren(mainGrid, 'div');
  if (mainColumns.length < 2) return;

  // Left column: title, eyebrow, h1
  const leftCol = mainColumns[0];
  // Right column: description, author, button
  const rightCol = mainColumns[1];

  // 3. Find the two images for the next row
  const imagesGrid = container.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let imageCells = [];
  if (imagesGrid) {
    const imageDivs = getDirectChildren(imagesGrid, 'div');
    imageCells = imageDivs.map(div => {
      // Each div.utility-aspect-1x1 contains an img
      const img = div.querySelector('img');
      return img ? img : '';
    });
  }

  // 4. Compose the first content row (top two columns)
  // Left: eyebrow + h1
  // Right: description + author + button
  const leftContent = document.createElement('div');
  Array.from(leftCol.childNodes).forEach(n => leftContent.appendChild(n.cloneNode(true)));

  // For right content, grab the description, author, and button
  const rightContent = document.createElement('div');
  // Description
  const desc = rightCol.querySelector('.rich-text');
  if (desc) rightContent.appendChild(desc);
  // Author block (avatar + name/date)
  const authorGrid = rightCol.querySelector('.w-layout-grid.grid-layout');
  if (authorGrid) {
    // Only append the author info (first child), not the button
    const authorRow = authorGrid.querySelector('div');
    if (authorRow) rightContent.appendChild(authorRow);
    // Button (Read more)
    const button = authorGrid.querySelector('a');
    if (button) rightContent.appendChild(button);
  }

  // 5. Build the table rows
  const rows = [
    headerRow,
    [leftContent, rightContent],
  ];
  // Only add image row if both images exist
  if (imageCells.length === 2) {
    rows.push(imageCells);
  }

  // 6. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
