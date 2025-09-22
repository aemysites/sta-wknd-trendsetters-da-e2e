/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if we have at least one column
  if (!columns.length) return;

  // Table header row (block name)
  const headerRow = ['Columns (columns30)'];

  // Each column's content goes in its own cell in the second row
  // We reference the entire column div, so any images or content inside are preserved
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
