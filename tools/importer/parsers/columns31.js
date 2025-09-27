/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout container (3 columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (should be 4: left name, left tags, center heading, right text)
  const gridChildren = Array.from(grid.children);

  // Column 1: Name and tags (left)
  const leftCol = document.createElement('div');
  if (gridChildren[0]) leftCol.append(gridChildren[0]); // Taylor Brooks
  if (gridChildren[1]) leftCol.append(gridChildren[1]); // Tags

  // Column 2: Heading (center)
  const centerCol = gridChildren[2] || document.createElement('div'); // h2 or empty

  // Column 3: Rich text (right)
  const rightCol = gridChildren[3] || document.createElement('div'); // rich text div or empty

  // Build the table rows
  const headerRow = ['Columns block (columns31)'];
  const contentRow = [leftCol, centerCol, rightCol];

  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
