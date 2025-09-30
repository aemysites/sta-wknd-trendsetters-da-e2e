/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Identify the left column (heading/description)
  const leftCol = gridChildren.find(child => child.querySelector('h2, h3, p'));

  // Identify the right column (contact info list)
  const rightCol = gridChildren.find(child => child.tagName === 'UL');

  // Identify the image (should be the last child in the grid)
  const image = grid.querySelector('img');

  // Header row must match block name exactly
  const headerRow = ['Columns block (columns9)'];

  // First content row: left (heading/text), right (contact info)
  const firstRow = [
    leftCol ? leftCol : '',
    rightCol ? rightCol : ''
  ];

  // Second content row: left (image), right (empty string for correct column count)
  const secondRow = [
    image ? image : '',
    ''
  ];

  // Compose table data
  const cells = [
    headerRow,
    firstRow,
    secondRow
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
