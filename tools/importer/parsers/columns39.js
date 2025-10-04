/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if there are columns
  if (!columns.length) return;

  // Header row as required
  const headerRow = ['Columns block (columns39)'];

  // Second row: each cell is one column div (contains image)
  const contentRow = columns.map(col => col);

  // Compose table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
