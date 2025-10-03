/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block spec
  const headerRow = ['Columns (columns39)'];

  // Defensive: find the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get the two main children of the grid: left (text/buttons), right (images)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: heading, subheading, button group
  const leftCol = gridChildren[0];
  // Right column: grid of images
  const rightCol = gridChildren[1];

  // Compose left column content (heading, subheading, buttons)
  const leftContent = [];
  // Heading
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);
  // Subheading/paragraph
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  // Button group
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // Compose right column content (images)
  // Find the inner grid containing the images
  let imagesContent = [];
  const imagesGrid = rightCol.querySelector('.w-layout-grid');
  if (imagesGrid) {
    // Get all images
    const imgs = Array.from(imagesGrid.querySelectorAll('img'));
    if (imgs.length) imagesContent = imgs;
  }

  // Build the table rows
  const tableRows = [
    headerRow,
    [leftContent, imagesContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
