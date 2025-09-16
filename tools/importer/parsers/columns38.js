/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Block header row as specified
  const headerRow = ['Columns (columns38)'];

  // Second row: each cell is a column, referencing the original div
  const contentRow = columns;

  // Compose table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
