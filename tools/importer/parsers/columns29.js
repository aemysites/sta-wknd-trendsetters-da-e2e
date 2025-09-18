/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Prepare header row as per block guidelines
  const headerRow = ['Columns (columns29)'];

  // Each column cell should reference the original column div (preserving images and semantics)
  const contentRow = columns.map(col => col);

  // Compose table rows
  const rows = [headerRow, contentRow];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(table);
}
