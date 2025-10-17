/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block (columns40) parsing
  // Get all immediate children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its main content (image)
  const columnCells = columns.map(col => {
    // Find the first image in the column
    const img = col.querySelector('img');
    // If image found, reference the image element; else, fallback to column content
    return img || col;
  });

  // Table rows: header, then one row with all columns
  const headerRow = ['Columns block (columns40)'];
  const contentRow = columnCells;

  const cells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
