/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns31)'];

  // Get the grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  const columns = Array.from(grid.children);

  // Column 1: Taylor Brooks
  const col1 = document.createElement('div');
  if (columns[0]) col1.appendChild(columns[0]);

  // Column 2: tags
  const col2 = document.createElement('div');
  if (columns[1]) col2.appendChild(columns[1]);

  // Column 3: heading + paragraphs
  const col3 = document.createElement('div');
  if (columns[2]) col3.appendChild(columns[2]); // heading
  if (columns[3]) col3.appendChild(columns[3]); // rich text paragraphs

  // Build content row: three columns
  const contentRow = [col1, col2, col3];

  // Build table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
