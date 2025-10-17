/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns31)'];

  // Find the main grid layout (3 columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (should be 4: name, tags, heading, rich text)
  const gridChildren = Array.from(grid.children);

  // Column 1: Name (leftmost column)
  const name = gridChildren[0]; // Taylor Brooks
  const nameCol = document.createElement('div');
  if (name) nameCol.appendChild(name);

  // Column 2: Tags (middle column)
  const tags = gridChildren[1]; // Tag list
  const tagsCol = document.createElement('div');
  if (tags) Array.from(tags.children).forEach(tag => tagsCol.appendChild(tag));

  // Column 3: Heading and rich text (rightmost column)
  const heading = gridChildren[2]; // h2
  const richTextWrapper = gridChildren[3]; // contains .rich-text
  const rightCol = document.createElement('div');
  if (heading) rightCol.appendChild(heading);
  if (richTextWrapper) rightCol.appendChild(richTextWrapper);

  // Build the table: header row, then one row with three columns
  const tableCells = [
    headerRow,
    [nameCol, tagsCol, rightCol]
  ];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
