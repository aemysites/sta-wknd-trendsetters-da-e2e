/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name for the header row
  const headerRow = ['Columns block (columns39)'];

  // Get all immediate child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the image element (if present)
  const columnCells = columns.map(col => {
    // Look for an <img> inside the column
    const img = col.querySelector('img');
    // If found, use the image element directly
    if (img) return img;
    // Otherwise, fallback to the column itself
    return col;
  });

  // Compose the table rows: header, then one row with images
  const rows = [
    headerRow,
    columnCells
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
