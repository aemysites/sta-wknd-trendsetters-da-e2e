/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the target block name as the header row
  const headerRow = ['Columns block (columns8)'];

  // Defensive: Find the grid container (should be the first child of the outer container)
  const grid = element.querySelector(':scope > .w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // For this source: first child is h2, second child is a div with p and a
  // We'll make two columns: left (h2), right (div with p and a)
  const leftCol = gridChildren[0]; // h2
  const rightCol = gridChildren[1]; // div with p and a

  // Defensive: ensure both columns exist
  if (!leftCol || !rightCol) return;

  // Build the table rows
  const rows = [
    headerRow,
    [leftCol, rightCol],
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
