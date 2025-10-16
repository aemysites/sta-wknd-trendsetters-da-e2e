/* global WebImporter */
export default function parse(element, { document }) {
  // Always start with the block header row
  const headerRow = ['Columns (columns4)'];

  // Defensive: Find the grid container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Expecting two columns based on screenshot and HTML
  // Left column: heading + paragraph
  // Right column: button group (two links)
  let leftCellContent = [];
  let rightCellContent = [];

  if (columns[0]) {
    // Collect all children (h2, p) from left column
    leftCellContent = Array.from(columns[0].children);
  }

  if (columns[1]) {
    // Collect all children (links) from right column
    rightCellContent = Array.from(columns[1].children);
  }

  // Second row: two columns, left and right
  const secondRow = [leftCellContent, rightCellContent];

  // Build the table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
