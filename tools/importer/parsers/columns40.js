/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns40)'];

  // Get all immediate child divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column will contain its content (usually an image)
  const contentRow = columns.map((col) => {
    // If the column contains an image, use the image element directly
    const img = col.querySelector('img');
    if (img) return img;
    // Otherwise, include the whole column (defensive)
    return col;
  });

  // Compose the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
