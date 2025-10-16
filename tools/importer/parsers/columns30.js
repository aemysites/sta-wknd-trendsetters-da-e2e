/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns30)'];

  // Get all immediate children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, use the entire column element as the cell content
  const contentRow = columns.map(col => col);

  // Build the table structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
