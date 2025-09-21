/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists and has children
  if (!element || !element.children || element.children.length === 0) return;

  // Header row as specified
  const headerRow = ['Columns (columns40)'];

  // Get all immediate child divs (each column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: If no columns, abort
  if (columnDivs.length === 0) return;

  // For this block, each child div is a column, and each contains an image
  // We'll reference the entire child div for resilience
  const columnsRow = columnDivs.map(div => div);

  // Build the table cells array
  const cells = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
