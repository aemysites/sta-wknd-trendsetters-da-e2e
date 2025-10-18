/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns30)'];

  // Get all direct children (columns)
  const columns = Array.from(element.children);

  // For each column, extract the image element if present, else fallback to the column
  const cells = columns.map(col => {
    const img = col.querySelector('img');
    // Reference the existing image element if found
    if (img) return img;
    // Fallback: reference the column itself (should not happen in this case)
    return col;
  });

  // Compose the table rows
  const tableRows = [
    headerRow, // Header row
    cells      // Second row: images as columns
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
