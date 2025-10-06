/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the target block name as the header row
  const headerRow = ['Columns block (columns1)'];

  // Get all direct children (these are the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column cell should contain the entire child div (which holds the image)
  const columnsRow = columns.map(col => col);

  // Build the table structure
  const tableCells = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new table
  element.replaceWith(block);
}
