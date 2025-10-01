/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Header row: block name as required
  const headerRow = ['Columns block (columns30)'];

  // Each column cell should reference the existing element, not clone or create new
  const contentRow = columns.map((col) => col);

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
