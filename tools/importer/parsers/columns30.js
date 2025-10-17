/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block header row per spec
  const headerRow = ['Columns block (columns30)'];

  // Extract columns: direct children divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column: extract its main image (reference the element, do not clone)
  const cells = columns.map(col => {
    const img = col.querySelector('img');
    // Reference the image element directly if present
    if (img) return img;
    // If no image, include all text content (but in this case, only images)
    return col;
  });

  // Compose table rows: header, then one row with all columns
  const rows = [headerRow, cells];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
