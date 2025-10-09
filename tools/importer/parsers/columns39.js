/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block (columns39) parser
  // 1. Header row must match block name exactly
  const headerRow = ['Columns block (columns39)'];

  // 2. Extract each direct child div as a column
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // 3. For each column, extract the image element (reference, not clone)
  const contentRow = columns.map(col => {
    // Find the first image
    const img = col.querySelector('img');
    // Only reference the image element if it exists
    if (img) return img;
    // If no image, insert an empty string (edge case, but ensures cell count)
    return '';
  });

  // 4. Compose the table rows
  const rows = [
    headerRow,
    contentRow
  ];

  // 5. Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 6. Replace the original element with the new table
  element.replaceWith(table);
}
