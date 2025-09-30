/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout.container');

  // Defensive: get left (text) and right (image) columns
  let leftCol = null;
  let rightCol = null;
  if (grid) {
    // The left column: the first child div (with heading, text, buttons)
    leftCol = grid.querySelector('div.section');
    // The right column: the image
    rightCol = grid.querySelector('img');
  }

  // Fallbacks if structure changes
  if (!leftCol) {
    leftCol = element.querySelector('div.section');
  }
  if (!rightCol) {
    rightCol = element.querySelector('img');
  }

  // Compose the table rows
  const headerRow = ['Columns block (columns5)'];
  const contentRow = [
    leftCol ? leftCol : '',
    rightCol ? rightCol : ''
  ];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
