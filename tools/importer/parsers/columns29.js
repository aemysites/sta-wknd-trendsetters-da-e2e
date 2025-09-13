/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get all immediate children (should be two divs, each with an image)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each column cell should contain the full aspect-ratio div (with its image)
  const cellsRow = columnDivs.map(div => div);

  // Table header: Block name as required
  const headerRow = ['Columns (columns29)'];

  // Build the table data
  const tableData = [headerRow, cellsRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
