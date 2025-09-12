/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header row as required
  const headerRow = ['Columns block (columns38)'];

  // Find all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each cell should reference the original column div (with its image)
  const contentRow = columns;

  // Compose the table data
  const tableData = [headerRow, contentRow];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original grid with the block table
  element.replaceWith(table);
}
