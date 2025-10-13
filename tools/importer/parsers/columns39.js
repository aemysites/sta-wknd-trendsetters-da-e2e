/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main grid containing the two columns
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // LEFT COLUMN: Headline, subheading, and buttons
  const leftCol = mainGrid.children[0];
  if (!leftCol) return;

  // Extract headline (h1)
  const headline = leftCol.querySelector('h1');
  // Extract subheading (p)
  const subheading = leftCol.querySelector('p');
  // Extract button group
  const buttonGroup = leftCol.querySelector('.button-group');

  // Compose left column cell content
  const leftCellContent = [];
  if (headline) leftCellContent.push(headline);
  if (subheading) leftCellContent.push(subheading);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // RIGHT COLUMN: Grid of images
  const rightCol = mainGrid.children[1];
  if (!rightCol) return;
  const imagesGrid = rightCol.querySelector('.w-layout-grid');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Compose right column cell content
  const rightCellContent = images.length ? images : [];

  // Table header row (must match block name exactly)
  const headerRow = ['Columns (columns39)'];
  // Table content row: two columns
  const secondRow = [leftCellContent, rightCellContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
