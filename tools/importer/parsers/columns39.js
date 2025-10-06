/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container (should have two columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // LEFT COLUMN: headline, subheading, button group
  const leftCol = columns[0];
  const leftContent = [];
  const h1 = leftCol.querySelector('h1');
  if (h1) leftContent.push(h1);
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // RIGHT COLUMN: images (reference existing elements, not cloning)
  const rightCol = columns[1];
  let images = [];
  const imagesGrid = rightCol.querySelector('.grid-layout');
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Table header: must match block name exactly
  const headerRow = ['Columns block (columns39)'];
  // Table second row: left column (text/buttons), right column (images)
  const secondRow = [leftContent, images];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
  ], document);

  element.replaceWith(table);
}
