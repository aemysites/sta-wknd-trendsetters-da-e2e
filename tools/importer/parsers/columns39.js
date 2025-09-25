/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get left and right columns
  const leftCol = mainGrid.children[0];
  const rightCol = mainGrid.children[1];

  // Defensive: fallback if structure is unexpected
  if (!leftCol || !rightCol) {
    const headerRow = ['Columns block (columns39)'];
    const contentRow = [element];
    const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
    element.replaceWith(table);
    return;
  }

  // LEFT COLUMN: headline, subheading, buttons
  const headline = leftCol.querySelector('h1');
  const subheading = leftCol.querySelector('p');
  const buttonGroup = leftCol.querySelector('.button-group');
  const leftContent = [];
  if (headline) leftContent.push(headline);
  if (subheading) leftContent.push(subheading);
  if (buttonGroup) leftContent.push(buttonGroup);

  // RIGHT COLUMN: images (all direct children img)
  const imagesGrid = rightCol.querySelector('.grid-layout');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  } else {
    images = Array.from(rightCol.querySelectorAll('img'));
  }

  // Compose table rows
  const headerRow = ['Columns block (columns39)'];
  const contentRow = [leftContent, images];
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
