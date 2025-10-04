/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns30)'];

  // Get all immediate children (should be the two aspect ratio divs)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if we have at least one column
  if (!columnDivs.length) return;

  // Each column cell should contain the entire aspect-ratio div (which contains the image)
  const columnsRow = columnDivs;

  // Compose the table data
  const tableData = [
    headerRow,
    columnsRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
