/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main column containers
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // --- LEFT COLUMN ---
  const leftCol = columns[0];
  // Gather heading, subheading, and button group
  const heading = leftCol.querySelector('h1');
  const subheading = leftCol.querySelector('p');
  const buttonGroup = leftCol.querySelector('.button-group');

  // Only include elements that exist
  const leftColContent = [];
  if (heading) leftColContent.push(heading);
  if (subheading) leftColContent.push(subheading);
  if (buttonGroup) leftColContent.push(buttonGroup);

  // --- RIGHT COLUMN ---
  const rightCol = columns[1];
  // Find all images in the right column's grid
  const imagesGrid = rightCol.querySelector('.grid-layout');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Compose right column content
  const rightColContent = images;

  // --- TABLE STRUCTURE ---
  const headerRow = ['Columns block (columns39)'];
  const secondRow = [leftColContent, rightColContent];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
