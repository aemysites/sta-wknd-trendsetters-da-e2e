/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Header row: always use block name
  const headerRow = ['Columns block (columns40)'];

  // Each cell is the content of a column (reference, not clone)
  const contentRow = columns.map(col => col);

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
