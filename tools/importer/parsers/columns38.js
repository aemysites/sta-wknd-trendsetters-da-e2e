/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children (columns)
  const columns = Array.from(element.children);

  // Header row for the block table
  const headerRow = ['Columns block (columns38)'];

  // Second row: each column's content (images only)
  const contentRow = columns.map(col => {
    // Find the first image in each column
    const img = col.querySelector('img');
    // Only include the image if it exists
    return img || '';
  });

  // Build the table cells array
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
