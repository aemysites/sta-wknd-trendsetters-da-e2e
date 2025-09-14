/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Extract the image element from each column (no text content in this example)
  const images = columns.map(col => {
    const img = col.querySelector('img');
    // Reference the actual image element from the DOM if present
    return img || '';
  });

  // Header row must match the block name exactly
  const headerRow = ['Columns block (columns38)'];
  const contentRow = images;

  // Create the table with the header and one row of images
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table block
  element.replaceWith(table);
}
