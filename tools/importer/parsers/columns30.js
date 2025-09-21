/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (these are the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if there are columns
  if (!columns.length) return;

  // Each column is a div containing an image
  // We'll extract the first image from each column
  const cells = [];

  // Header row as required
  const headerRow = ['Columns (columns30)'];
  cells.push(headerRow);

  // Second row: one cell per column, each containing the image (if present)
  const contentRow = columns.map(col => {
    // Try to find the image inside the column
    const img = col.querySelector('img');
    return img ? img : '';
  });
  cells.push(contentRow);

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
