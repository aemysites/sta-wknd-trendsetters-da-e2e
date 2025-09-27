/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children (the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if we have columns
  if (!columns.length) return;

  // Table header row: block name
  const headerRow = ['Columns (columns7)'];

  // Table content row: each cell is a column's content
  // For this block, each column contains an image inside a div
  const contentRow = columns.map((col) => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
