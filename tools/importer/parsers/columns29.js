/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Prepare table rows
  const rows = [];
  // Header row as required by block spec
  rows.push(['Columns (columns29)']);
  // Content row: each cell is the original column div (with its image)
  rows.push(columns);
  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original grid with the table
  element.replaceWith(table);
}
