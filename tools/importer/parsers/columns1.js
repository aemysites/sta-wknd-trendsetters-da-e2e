/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns block (columns1)'];

  // Get all direct children (each is a column cell)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For this block, each direct child is a column and contains an image
  // We'll use the direct child as the cell content for resilience
  const columnsRow = columnDivs.map((colDiv) => colDiv);

  // Assemble the table rows
  const tableRows = [headerRow, columnsRow];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(table);
}
