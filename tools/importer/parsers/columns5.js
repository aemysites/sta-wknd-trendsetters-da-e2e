/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const grid = element.querySelector('.grid-layout.grid-gap-xxl');
  if (!grid) return;

  // The left column: contains heading, paragraph, and buttons
  const leftCol = grid.querySelector('.section');
  // The right column: image
  const rightCol = grid.querySelector('img');

  // Defensive: ensure both columns exist
  if (!leftCol && !rightCol) return;

  // Compose header row exactly as required
  const headerRow = ['Columns block (columns5)'];
  // Compose columns row with references to the actual elements
  const columnsRow = [leftCol, rightCol];

  // Create the table using the WebImporter utility
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
