/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns40)'];

  // Get all direct child divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column: only reference the <img> element (not clone, not URL)
  const contentRow = columns.map((col) => {
    const img = col.querySelector('img');
    // Only reference the actual image element if present
    return img || '';
  });

  // Compose the table rows
  const rows = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
