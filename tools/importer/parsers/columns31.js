/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns31)'];

  // Defensive: Get the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Left column: Name and tags
  // Right column: Heading and rich text
  // Screenshot shows two main columns

  // Left column: extract name and tags
  const leftCol = document.createElement('div');
  // Find the name (first child)
  const name = columns[0];
  if (name) leftCol.appendChild(name);
  // Find the tags (second child)
  const tags = columns[1];
  if (tags) leftCol.appendChild(tags);

  // Right column: heading and rich text
  const rightCol = document.createElement('div');
  // Heading (third child)
  const heading = columns[2];
  if (heading) rightCol.appendChild(heading);
  // Rich text (fourth child)
  const richText = columns[3];
  if (richText) rightCol.appendChild(richText);

  // Build the table rows
  const rows = [
    headerRow,
    [leftCol, rightCol]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
