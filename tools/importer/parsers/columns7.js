/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with block name
  const headerRow = ['Columns block (columns7)'];

  // Get all direct children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if there are columns
  if (!columns.length) return;

  // Each column cell should contain the content of its respective div
  // We use the div itself as the cell content for resilience
  const contentRow = columns.map((col) => col);

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
