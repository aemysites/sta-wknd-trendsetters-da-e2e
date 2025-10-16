/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns8)'];

  // Defensive: Find the grid-layout container (the actual columns)
  const grid = element.querySelector('.grid-layout');
  let leftCol, rightCol;

  if (grid) {
    // The first child is the heading (left column)
    leftCol = grid.children[0];
    // The second child is the right column (contains paragraph and button)
    rightCol = grid.children[1];
  } else {
    // Fallback: Try to find the first heading and the rest as right column
    leftCol = element.querySelector('h2');
    rightCol = document.createElement('div');
    // Collect paragraph and button
    element.querySelectorAll('p, a.button').forEach((el) => rightCol.appendChild(el));
  }

  // Second row: two columns, left is heading, right is paragraph + button
  const secondRow = [leftCol, rightCol];

  // Assemble table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
