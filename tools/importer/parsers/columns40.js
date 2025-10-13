/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns40)'];

  // Get all immediate child divs (each is a column cell)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its main content (in this case, the image element)
  // Defensive: If a column has more than just an image, include the whole column div
  const columnCells = columns.map(col => {
    // Try to find a single image as the main content
    const img = col.querySelector('img');
    if (img && col.children.length === 1) {
      return img;
    }
    // Otherwise, include the entire column div
    return col;
  });

  // Build the table rows: header, then one row with all columns
  const rows = [
    headerRow,
    columnCells
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
