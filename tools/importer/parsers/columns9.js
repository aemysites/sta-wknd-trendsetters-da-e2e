/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (the columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Identify the left column (text content)
  const leftCol = gridChildren.find(child => child.querySelector('h2') || child.querySelector('h3'));
  // Identify the right column (contact list)
  const rightCol = gridChildren.find(child => child.tagName === 'UL');
  // Identify the main image (large image at the bottom)
  const mainImg = gridChildren.find(child => child.tagName === 'IMG');

  // Defensive: If any main part is missing, abort
  if (!leftCol || !rightCol || !mainImg) return;

  // Compose the first row: block name
  const headerRow = ['Columns (columns9)'];

  // Compose the second row: two columns (text, contact)
  const secondRow = [leftCol, rightCol];

  // Compose the third row: image in first column, second column empty
  const thirdRow = [mainImg.cloneNode(true), ''];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
    thirdRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
