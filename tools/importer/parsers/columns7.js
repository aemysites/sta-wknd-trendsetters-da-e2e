/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each represents a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Each column contains an image; reference the image element directly
  const cells = columns.map(col => {
    const img = col.querySelector('img');
    return img ? img : '';
  });

  // Table structure: header row, then one row with all images as columns
  const headerRow = ['Columns block (columns7)'];
  const contentRow = cells;
  const rows = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
