/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Defensive: ensure both columns exist
  if (gridChildren.length < 2) return;

  // LEFT COLUMN: Heading, subheading, buttons
  const leftCol = gridChildren[0];
  const leftContent = [];
  // Heading
  const h1 = leftCol.querySelector('h1');
  if (h1) leftContent.push(h1);
  // Subheading
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  // Button group
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // RIGHT COLUMN: Images
  const rightCol = gridChildren[1];
  // The images are inside a nested grid in rightCol
  const imagesGrid = rightCol.querySelector('.w-layout-grid');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  } else {
    images = Array.from(rightCol.querySelectorAll('img'));
  }

  // Build the table rows
  const headerRow = ['Columns (columns38)'];
  const contentRow = [leftContent, images];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
