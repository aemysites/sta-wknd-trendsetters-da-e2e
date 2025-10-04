/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const grid = element.querySelector('.grid-layout.container');
  if (!grid) return;

  // Compose the table rows
  const headerRow = ['Columns (columns5)'];

  // Get left column content (all children except the image)
  const leftCol = grid.querySelector('.section');
  // Get right column image
  const rightCol = grid.querySelector('img');

  if (!leftCol || !rightCol) return;

  // Clone nodes to avoid moving them from the DOM
  const leftColContent = leftCol.cloneNode(true);
  const rightColImage = rightCol.cloneNode(true);

  const contentRow = [leftColContent, rightColImage];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
