/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns visually)
  const columns = Array.from(grid.children);
  if (columns.length < 4) return; // Defensive: expect 4 items

  // Compose the header row
  const headerRow = ['Columns block (columns31)'];

  // Left column: name
  const leftCol = columns[0];

  // Middle column: tags + heading
  const middleCol = document.createElement('div');
  if (columns[1]) middleCol.appendChild(columns[1]); // tags
  if (columns[2]) middleCol.appendChild(columns[2]); // heading

  // Right column: rich text
  const rightCol = columns[3];

  // Build the table rows
  const rows = [
    headerRow,
    [leftCol, middleCol, rightCol]
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
