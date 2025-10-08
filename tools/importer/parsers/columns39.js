/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns39)'];

  // Get all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, find the image element (if any)
  const columnCells = columns.map(col => {
    // Find the first image in the column
    const img = col.querySelector('img');
    // If found, use the image element; otherwise, use the column itself
    return img || col;
  });

  // Build the table rows
  const rows = [
    headerRow,
    columnCells
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
