/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns39)'];

  // Get all immediate child divs (each is a column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each column is a cell in the second row, referencing the existing divs
  const columnsRow = columnDivs.map(div => div);

  // Compose the table rows
  const rows = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
