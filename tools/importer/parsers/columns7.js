/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists and is a grid-layout
  if (!element || !element.classList.contains('grid-layout')) return;

  // Header row as required by block spec
  const headerRow = ['Columns (columns7)'];

  // Get all direct children (these are the columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each column div contains an image (ignore blurred faces per instruction)
  // Place each column's content (div) directly in a cell
  const columnsRow = columnDivs.map(div => div);

  // Build the table data
  const tableData = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
