/* global WebImporter */
export default function parse(element, { document }) {
  // Columns (columns40) block: extract each column's image
  const headerRow = ['Columns (columns40)'];

  // Find all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its image element (reference, not clone)
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    // If image found, use it directly
    if (img) return img;
    // If no image, preserve the column's content (edge case)
    return col;
  });

  // Create the table: header and one row of columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
