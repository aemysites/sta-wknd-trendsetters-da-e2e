/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate children (should be two divs, each with an image)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, get the image inside
  const cells = columns.map(col => {
    // Find the image inside this column
    const img = col.querySelector('img');
    return img ? img : '';
  });

  // Build the table rows
  const tableRows = [
    ['Columns block (columns30)'], // Header row
    cells // Second row: one cell per column/image
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
