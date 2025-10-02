/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists and is a container
  if (!element || !element.children || element.children.length === 0) return;

  // Header row as specified
  const headerRow = ['Columns (columns7)'];

  // Get all direct children (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For this block, each column contains an image inside a div
  // We want each cell to contain the entire column's content (the div)
  const contentRow = columns.map(col => col);

  // Compose table cells
  const cells = [headerRow, contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
