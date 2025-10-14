/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns30)'];

  // Get all direct child divs (each is a column cell)
  const columnDivs = element.querySelectorAll(':scope > div');

  // Each column cell will contain the entire content of its div (here: an image in a wrapper)
  const contentRow = Array.from(columnDivs);

  // Build the table rows array
  const rows = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
