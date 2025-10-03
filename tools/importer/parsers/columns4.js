/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate grid children (columns)
  const grid = element.querySelector('.grid-layout');
  let columns = [];
  if (grid) {
    // Defensive: Only use direct children as columns
    columns = Array.from(grid.children);
  }

  // Defensive: fallback to container children if grid not found
  if (columns.length === 0) {
    const container = element.querySelector('.container');
    if (container) {
      columns = Array.from(container.children);
    }
  }

  // Defensive: fallback to section children if nothing else
  if (columns.length === 0) {
    columns = Array.from(element.children);
  }

  // Compose the table rows
  const headerRow = ['Columns block (columns4)'];

  // Second row: each column's content
  // For this block, each grid child is a column. Put the whole column element in its cell.
  // This is resilient to variations and matches the visual layout.
  const contentRow = columns.map((col) => col);

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
