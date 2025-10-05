/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each is a column chunk)
  const columns = Array.from(grid.children);

  // Defensive: check we have at least 4 children
  if (columns.length < 4) return;

  // Prepare the header row as specified
  const headerRow = ['Columns block (columns31)'];

  // Compose left column: name + tags
  const leftCol = document.createElement('div');
  leftCol.appendChild(columns[0]); // Taylor Brooks
  leftCol.appendChild(columns[1]); // Tags

  // Center column: heading
  const centerCol = columns[2]; // h2

  // Right column: paragraphs
  const rightCol = columns[3]; // rich-text div

  // Build the table rows
  const tableRows = [
    headerRow,
    [leftCol, centerCol, rightCol],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
