/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if we have at least one column
  if (!columns.length) return;

  // Header row as required
  const headerRow = ['Columns (columns40)'];

  // Second row: each cell is the content of a column div
  // For this block, each column is just the image inside the div
  const contentRow = columns.map(col => {
    // Try to find the image inside the column
    const img = col.querySelector('img');
    // Reference the existing image element if found, otherwise reference the column div
    return img ? img : col;
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
