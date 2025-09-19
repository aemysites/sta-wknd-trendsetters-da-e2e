/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Get all direct children (should be the 3 column divs)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if we have at least one column
  if (!columns.length) return;

  // Step 2: For each column, extract the image element only (reference, do not clone)
  const columnCells = columns.map((col) => {
    const img = col.querySelector('img');
    // Only reference the image element if it exists
    if (img) return img;
    // If no image, return empty string (no content)
    return '';
  });

  // Step 3: Build the table rows
  const rows = [
    ['Columns (columns12)'], // header row
    columnCells              // columns row
  ];

  // Step 4: Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Step 5: Replace the original element
  element.replaceWith(table);
}
