/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns31)'];

  // Find the grid layout (the main columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the column contents)
  const gridChildren = Array.from(grid.children);

  // Left column: name and tags
  const leftCol = document.createElement('div');
  // First child: name
  if (gridChildren[0]) leftCol.appendChild(gridChildren[0]);
  // Second child: tags
  if (gridChildren[1]) leftCol.appendChild(gridChildren[1]);

  // Right column: heading and rich text
  const rightCol = document.createElement('div');
  // Third child: heading
  if (gridChildren[2]) rightCol.appendChild(gridChildren[2]);
  // Fourth child: rich text
  if (gridChildren[3]) rightCol.appendChild(gridChildren[3]);

  // Build the table rows
  const rows = [
    headerRow,
    [leftCol, rightCol],
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
