/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns15)'];

  // Find the grid-layout container (the actual columns)
  const grid = element.querySelector('.grid-layout');
  let columnDivs = [];
  if (grid) {
    // Get all immediate children of the grid (each is a column)
    columnDivs = Array.from(grid.children);
  } else {
    // Defensive: fallback to all direct children if grid-layout is missing
    columnDivs = Array.from(element.children);
  }

  // The columns block expects each column's content in its own cell
  // We'll collect the entire content of each column div for resilience
  const columnsRow = columnDivs.map(col => col);

  // Compose the table rows
  const tableRows = [headerRow, columnsRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
