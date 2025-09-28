/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (3 columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns visually)
  const columns = Array.from(grid.children);
  if (columns.length < 4) return; // Defensive: Expecting 4 children

  // Header row
  const headerRow = ['Columns (columns31)'];

  // Column 1: Name (Taylor Brooks)
  const nameCol = columns[0];
  // Column 2: Tags (Casual Vibes, Sporty Looks, Party Ready)
  const tagsCol = columns[1];
  // Column 3: Heading (Trends made for living bold)
  const headingCol = columns[2];
  // Column 4: Rich text (paragraphs)
  const richTextCol = columns[3];

  // Compose left cell: Name and tags vertically stacked
  const leftCell = document.createElement('div');
  leftCell.appendChild(nameCol);
  leftCell.appendChild(tagsCol);

  // Middle cell: Heading
  const middleCell = headingCol;

  // Right cell: Rich text
  const rightCell = richTextCol;

  // Second row: 3 columns
  const secondRow = [leftCell, middleCell, rightCell];

  // Table structure
  const tableCells = [headerRow, secondRow];

  // Create table
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element
  element.replaceWith(block);
}
