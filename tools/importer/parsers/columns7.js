/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns7)'];

  // Get all immediate child divs (each column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Defensive: Only proceed if we have at least one column
  if (!columnDivs.length) return;

  // For this block, each column is a div containing an image
  // We'll extract the image element from each column
  const columnsRow = columnDivs.map(col => {
    // Find the first image in the column
    const img = col.querySelector('img');
    // Reference the existing image element directly
    return img || '';
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
