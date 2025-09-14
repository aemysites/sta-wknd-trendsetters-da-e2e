/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Use the correct block header
  const headerRow = ['Columns (columns36)'];

  // Find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get left (text) and right (images) columns
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // --- Left Column ---
  const leftCol = gridChildren[0];
  const leftContent = [];
  // Heading
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);
  // Subheading
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  // Button group
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // --- Right Column ---
  const rightCol = gridChildren[1];
  const imagesGrid = rightCol.querySelector('.grid-layout');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Compose columns: left text/buttons, then each image as a column
  const columns = [leftContent, ...images];

  // Compose table rows
  const rows = [headerRow, columns];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
