/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children that represent columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: If no columns, do nothing
  if (!columns.length) return;

  // Header row as required
  const headerRow = ['Columns (columns30)'];

  // Second row: each cell is the original column div (preserving all content and semantics)
  const contentRow = columns.map(col => col);

  // Compose table rows
  const rows = [headerRow, contentRow];

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
