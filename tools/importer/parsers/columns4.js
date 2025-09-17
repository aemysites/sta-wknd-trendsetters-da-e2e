/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists and has children
  if (!element || !element.children || element.children.length === 0) return;

  // Header row as required
  const headerRow = ['Columns (columns4)'];

  // Get all direct children (each column)
  const columnDivs = Array.from(element.children);

  // For each column, extract its content
  // In this HTML, each child div contains a single img
  const columns = columnDivs.map((colDiv) => {
    // Defensive: find the first img inside the column div
    const img = colDiv.querySelector('img');
    return img ? img : '';
  });

  // Build the table: header, then one row with all columns
  const cells = [
    headerRow,
    columns
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
