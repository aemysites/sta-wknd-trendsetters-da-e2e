/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Get all immediate children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Each column is a div with an aspect ratio class, containing an img
  const cells = [];
  // Header row as required
  const headerRow = ['Columns (columns29)'];
  cells.push(headerRow);

  // Second row: one cell per column
  const contentRow = columns.map(col => {
    // Find the image inside this column
    const img = col.querySelector('img');
    // Defensive: only include if image exists
    return img ? img : '';
  });
  cells.push(contentRow);

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
