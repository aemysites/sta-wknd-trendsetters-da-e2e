/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Build header row as required
  const headerRow = ['Columns (columns30)'];

  // Each column cell should reference the original column div (preserving all content and semantics)
  const contentRow = columns.map(col => col);

  // Compose the table rows
  const tableRows = [headerRow, contentRow];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
