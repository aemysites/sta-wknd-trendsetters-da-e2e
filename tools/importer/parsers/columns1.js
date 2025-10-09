/* global WebImporter */
export default function parse(element, { document }) {
  // Columns (columns1) block parser
  // Header row must match block name exactly
  const headerRow = ['Columns (columns1)'];

  // Get all direct children of the grid container (each is a column)
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: If no children, do nothing
  if (!children.length) return;

  // Each child should contain an image. Reference the image element, not clone or URL.
  const columns = children.map((col) => {
    // Find the first image in each column
    const img = col.querySelector('img');
    // If image exists, reference it; otherwise, empty string
    return img ? img : '';
  });

  // Build rows: header, then columns row
  const rows = [headerRow, columns];

  // Create the table using WebImporter utility
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
