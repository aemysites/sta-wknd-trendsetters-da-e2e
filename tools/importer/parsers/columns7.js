/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the image (if present)
  const columnCells = columns.map((col) => {
    // Try to find an <img> inside this column
    const img = col.querySelector('img');
    if (img) {
      // Reference the existing image element
      return img;
    }
    // If no image, just put the whole column
    return col;
  });

  // Build the table rows
  const headerRow = ['Columns (columns7)'];
  const contentRow = columnCells;

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
