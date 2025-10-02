/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if there are columns
  if (!columns.length) return;

  // Header row as required by block spec
  const headerRow = ['Columns (columns40)'];

  // Second row: each cell is the content of a column div
  // We want to preserve the original image elements
  const contentRow = columns.map(col => {
    // If the column contains only an image, just use the image element
    const img = col.querySelector('img');
    if (img && col.children.length === 1) {
      return img;
    }
    // Otherwise, use the whole column content
    return col;
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
