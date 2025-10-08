/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block header row
  const headerRow = ['Columns block (columns38)'];

  // Find the grid layout containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: heading, subheading, buttons
  const leftCol = gridChildren[0];
  const leftCellContent = [];

  // Heading (preserve heading level)
  const heading = leftCol.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) leftCellContent.push(heading);

  // Subheading (first <p> only)
  const subheading = leftCol.querySelector('p');
  if (subheading) leftCellContent.push(subheading);

  // Button group (reference, not clone)
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // Right column: nested grid of images
  const rightCol = gridChildren[1];
  const nestedGrid = rightCol.querySelector('.w-layout-grid.grid-layout');
  let images = [];
  if (nestedGrid) {
    images = Array.from(nestedGrid.querySelectorAll('img'));
  }

  // Only reference existing image elements (do not clone)
  let rightCellContent = '';
  if (images.length > 0) {
    // Wrap images in a div for layout
    const imgDiv = document.createElement('div');
    images.forEach(img => imgDiv.appendChild(img));
    rightCellContent = imgDiv;
  }

  // Table second row: left column (text/buttons), right column (images)
  const secondRow = [leftCellContent, rightCellContent];

  // Build table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
  ], document);

  // Replace original element with the table
  element.replaceWith(table);
}
