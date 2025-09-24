/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (3 columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 3) return;

  // Prepare the header row
  const headerRow = ['Columns (columns31)'];

  // Column 1: Name and tags
  const col1 = document.createElement('div');
  // Name (first child)
  if (columns[0]) col1.appendChild(columns[0]);
  // Tags (second child)
  if (columns[1]) col1.appendChild(columns[1]);

  // Column 2: Heading (third child)
  const col2 = columns[2] || '';

  // Column 3: Rich text (fourth child)
  const col3 = columns[3] || '';

  // Build the second row (columns)
  const secondRow = [col1, col2, col3];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow
  ], document);

  element.replaceWith(table);
}
