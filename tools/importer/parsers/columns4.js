/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process if element exists
  if (!element || !document) return;

  // Header row as per block spec
  const headerRow = ['Columns (columns4)'];

  // Get all immediate children (each column cell)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Each column cell: for this block, each child div contains an image
  // We want to put the entire div in the cell for resilience
  const columnsRow = columnDivs.map(div => div);

  // Compose the table data
  const tableData = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
