/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (three columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid
  const columns = Array.from(grid.children);

  // Defensive: Expecting at least 4 children: name, tags, heading, rich text
  if (columns.length < 4) return;

  // Column 1: Stack name and tags vertically in a new div
  const col1 = document.createElement('div');
  col1.appendChild(columns[0].cloneNode(true)); // Name
  col1.appendChild(columns[1].cloneNode(true)); // Tags

  // Column 2: Heading (h2)
  const col2 = columns[2].cloneNode(true);

  // Column 3: Rich text paragraphs
  // Defensive: Find the rich text container (may be columns[3] or another child)
  let col3 = null;
  for (let i = 3; i < columns.length; i++) {
    if (columns[i].querySelector('.rich-text, .w-richtext, .paragraph-lg')) {
      col3 = columns[i].cloneNode(true);
      break;
    }
  }
  if (!col3 && columns[3]) col3 = columns[3].cloneNode(true);

  // Table header row (must match block name exactly)
  const headerRow = ['Columns (columns31)'];
  // Table content row: 3 columns
  const contentRow = [col1, col2, col3];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original section element
  element.replaceWith(table);
}
