/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check for child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) return;

  // Header row as specified
  const headerRow = ['Columns block (columns4)'];

  // Each column cell: use the entire child div (contains the image)
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
