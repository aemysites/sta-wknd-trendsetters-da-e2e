/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header as per instructions
  const headerRow = ['Columns (columns29)'];

  // Find all direct child divs (columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: if there are no columns, do nothing
  if (!columnDivs.length) return;

  // Build the table data
  const tableData = [
    headerRow,
    columnDivs.map(col => col),
  ];

  // Create the columns block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
