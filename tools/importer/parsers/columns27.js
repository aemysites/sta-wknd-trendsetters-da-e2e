/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid containing the two columns
  const container = element.querySelector('.container');
  if (!container) return;

  // The main grid is the first .w-layout-grid inside the container
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Get all direct children of the main grid
  const mainGridChildren = Array.from(mainGrid.children);

  // First two children are the left and right column content
  // Left: heading and paragraph
  const leftCol = document.createElement('div');
  if (mainGridChildren[0]) leftCol.appendChild(mainGridChildren[0]); // h2-heading
  if (mainGridChildren[1]) leftCol.appendChild(mainGridChildren[1]); // paragraph-lg

  // Right: testimonial grid (contains divider, avatar, name, title, logo)
  const rightCol = mainGridChildren[2] || document.createElement('div');

  // Table header row
  const headerRow = ['Columns (columns27)'];

  // Table second row: two columns, left and right
  const secondRow = [leftCol, rightCol];

  // Create table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(block);
}
