/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row must match exactly
  const headerRow = ['Columns block (columns40)'];

  // Get all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column contains a single image, referenced directly
  const row = columns.map(col => {
    const img = col.querySelector('img');
    // Reference the existing image element if present
    return img || document.createTextNode('');
  });

  // Build the table rows
  const rows = [headerRow, row];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
