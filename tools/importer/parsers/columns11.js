/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two content columns
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  if (!mainGrid) return;

  // Get the two main content columns (left and right)
  const columns = Array.from(mainGrid.children);
  if (columns.length < 2) return;

  // LEFT COLUMN: contains eyebrow and heading
  const leftCol = columns[0];

  // RIGHT COLUMN: contains intro, author, button
  const rightCol = columns[1];

  // Find the grid with two images
  const imagesGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  let imageCells = [];
  if (imagesGrid) {
    imageCells = Array.from(imagesGrid.children).map((imgWrap) => {
      const img = imgWrap.querySelector('img');
      return img ? img : '';
    });
  }

  // Defensive: ensure two image cells
  if (imageCells.length < 2) {
    imageCells = ['', ''];
  }

  // Table header row must match block name exactly
  const headerRow = ['Columns block (columns11)'];
  const firstContentRow = [leftCol, rightCol];
  const secondContentRow = [imageCells[0], imageCells[1]];

  const cells = [
    headerRow,
    firstContentRow,
    secondContentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
