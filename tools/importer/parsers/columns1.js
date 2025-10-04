/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as header
  const headerRow = ['Columns (columns1)'];

  // Get all direct children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column cell should reference the existing image element (not clone, not URL)
  const columnCells = columns.map((col) => {
    // Find the image in the column
    const img = col.querySelector('img');
    if (img) {
      return img;
    }
    // If no image, fallback to the column itself (in case of future edge cases)
    return col;
  });

  // Table rows: header, then columns as a single row
  const rows = [headerRow, columnCells];

  // Create table using WebImporter utility
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
