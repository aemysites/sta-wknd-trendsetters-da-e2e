/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (3 columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be 4: left, left-mid, center, right)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 4) return;

  // Assign columns based on visual layout:
  // Col 1: Name (Taylor Brooks)
  // Col 2: Tags (Casual Vibes, Sporty Looks, Party Ready)
  // Col 3: Heading (Trends made for living bold)
  // Col 4: Rich text (paragraphs)
  const col1 = gridChildren[0];
  const col2 = gridChildren[1];
  const col3 = gridChildren[2];
  const col4 = gridChildren[3];

  // Compose left cell: name + tags
  const leftCell = document.createElement('div');
  if (col1 && col1.textContent.trim()) leftCell.appendChild(col1);
  if (col2 && col2.childNodes.length) leftCell.appendChild(col2);

  // Center cell: heading
  const centerCell = col3;

  // Right cell: rich text
  const rightCell = col4;

  // Build the table
  const headerRow = ['Columns block (columns31)'];
  const columnsRow = [leftCell, centerCell, rightCell];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  element.replaceWith(table);
}
