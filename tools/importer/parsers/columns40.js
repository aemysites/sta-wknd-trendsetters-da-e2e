/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns40)'];

  // Defensive: Get all direct children (columns) of the grid container
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For this block, each column contains a single image
  const images = columns.map(col => {
    // Reference the existing image element (not clone, not create new)
    const img = col.querySelector('img');
    return img ? img : document.createTextNode(''); // Edge case: empty column
  });

  // Second row: one cell per image (each image in its own column)
  const contentRow = images;

  // Build the table structure
  const tableCells = [headerRow, contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
