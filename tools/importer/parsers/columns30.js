/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row (single column)
  const headerRow = ['Columns (columns30)'];

  // Get all immediate children (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, find the image (if present)
  const columnCells = columns.map(col => {
    const img = col.querySelector('img');
    if (img) return img;
    return col;
  });

  // Compose the table rows: header, then one row with all images as columns
  const cells = [
    headerRow,
    columnCells
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
