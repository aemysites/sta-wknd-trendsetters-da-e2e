/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container (should contain two columns)
  let grid = element.querySelector('.grid-layout.container');
  let leftCol, rightCol;

  if (grid) {
    // Left column: the section with heading, paragraph, buttons
    leftCol = grid.querySelector('.section');
    // Right column: the image
    rightCol = grid.querySelector('img');
  } else {
    // Fallback: try to find left and right columns directly
    leftCol = element.querySelector('.section');
    rightCol = element.querySelector('img');
  }

  // Defensive: if leftCol is a grid, dig one level deeper
  if (leftCol && leftCol.classList.contains('grid-layout')) {
    const subDivs = leftCol.querySelectorAll(':scope > div');
    leftCol = subDivs[0] || leftCol;
  }

  // --- FIX: Ensure rightCol is a DOM node, not null ---
  // If rightCol is not found, try to find any img inside the element
  if (!rightCol) {
    rightCol = element.querySelector('img');
  }

  // Table header must match block name exactly
  const headerRow = ['Columns (columns5)'];
  const contentRow = [leftCol, rightCol];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
