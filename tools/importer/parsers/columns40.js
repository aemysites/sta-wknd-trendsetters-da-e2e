/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header
  const headerRow = ['Columns (columns40)'];

  // Get all immediate child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column contains a single image
  // Build the row of images, referencing the existing <img> elements
  const imageRow = columns.map(col => {
    const img = col.querySelector('img');
    return img || '';
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
