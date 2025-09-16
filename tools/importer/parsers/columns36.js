/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block table header row
  const headerRow = ['Columns block (columns36)'];

  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main columns: left (content), right (images)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;
  const leftCol = gridChildren[0];
  const rightCol = gridChildren[1];

  // LEFT COLUMN: keep all content (heading, subheading, buttons)
  // Reference the actual element for semantic fidelity

  // RIGHT COLUMN: find images grid and extract images (excluding blurred face)
  let imagesGrid = rightCol.querySelector('.grid-layout');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
    // Exclude the first image (blurred face)
    if (images.length > 1) {
      images = images.slice(1);
    }
  } else {
    // Fallback: find images directly in rightCol
    images = Array.from(rightCol.querySelectorAll('img'));
    if (images.length > 1) {
      images = images.slice(1);
    }
  }

  // Compose second row: left column (content), right column (images)
  const secondRow = [leftCol, images];

  // Create the table for the block
  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);

  // Replace the element with the block table
  element.replaceWith(table);
}
