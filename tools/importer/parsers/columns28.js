/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns28)'];

  // Defensive: Find the grid layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  let leftCol, rightCol;

  if (grid) {
    // Get immediate children of the grid (should be two: left and right columns)
    const cols = Array.from(grid.children);
    // Find the text column (should be the div) and the image column (should be the img)
    leftCol = cols.find((c) => c.tagName === 'DIV');
    rightCol = cols.find((c) => c.tagName === 'IMG');
  }

  // Defensive fallback: If not found, try to find them in the container
  if (!leftCol || !rightCol) {
    const divs = Array.from(element.querySelectorAll('div'));
    leftCol = divs.find((d) => d.querySelector('h2,h1'));
    rightCol = element.querySelector('img');
  }

  // The left column contains all text and button
  // The right column is the image
  // We'll reference the entire leftCol div and the rightCol image element

  // Second row: two columns (left: text, right: image)
  const secondRow = [leftCol, rightCol];

  // Build the table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
