/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns31)'];

  // Defensive: Find the grid layout container (which holds the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each is a column)
  const columns = Array.from(grid.children);

  // Column 1: Name and tags
  const col1 = document.createElement('div');
  // Find the name (first child)
  const name = columns[0];
  if (name) col1.appendChild(name);
  // Find the tags (second child)
  const tags = columns[1];
  if (tags) col1.appendChild(tags);

  // Column 2: Heading
  const col2 = document.createElement('div');
  const heading = columns[2];
  if (heading) col2.appendChild(heading);

  // Column 3: Rich text paragraphs
  const col3 = document.createElement('div');
  const richText = columns[3];
  if (richText) col3.appendChild(richText);

  // Build the table rows
  const rows = [
    headerRow,
    [col1, col2, col3],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
