/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns39)'];

  // Get all immediate child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only process if there are columns
  if (!columns.length) return;

  // For each column, extract its content (usually an image)
  const columnCells = columns.map((col) => {
    // Try to find the image inside each column
    const img = col.querySelector('img');
    if (img) {
      // Reference the existing image element (do not clone or create new)
      return img;
    }
    // If no image, include the whole column's content
    return col;
  });

  // Build the table rows
  const rows = [
    headerRow,
    columnCells,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
