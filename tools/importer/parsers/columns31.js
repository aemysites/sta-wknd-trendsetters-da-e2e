/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (columns)
  const columns = Array.from(grid.children);

  // Header row as required
  const headerRow = ['Columns (columns31)'];

  // Compose the columns for the second row
  // Screenshot shows three columns: left (name + tags), middle (heading), right (paragraphs)
  // But the HTML structure is: [name], [tags], [heading], [paragraphs]
  // Visually, the leftmost column is [name + tags], middle is [heading], right is [paragraphs]
  // So we need to combine the first two children into one cell

  // Defensive: check for expected children
  const nameEl = columns[0];
  const tagsEl = columns[1];
  const headingEl = columns[2];
  const textEl = columns[3];

  // Compose left column: name + tags
  const leftCol = document.createElement('div');
  if (nameEl) leftCol.appendChild(nameEl);
  if (tagsEl) leftCol.appendChild(tagsEl);

  // Compose middle column: heading
  const middleCol = headingEl || document.createElement('div');

  // Compose right column: paragraphs
  const rightCol = textEl || document.createElement('div');

  // Build the table rows
  const tableRows = [
    headerRow,
    [leftCol, middleCol, rightCol],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
