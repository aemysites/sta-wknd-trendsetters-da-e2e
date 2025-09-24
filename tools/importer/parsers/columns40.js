/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns40)'];

  // Get all immediate children (columns) of the grid container
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only include non-empty columns
  const contentRow = columns.map(col => {
    // If the column contains an image, use the image element directly
    const img = col.querySelector('img');
    if (img) return img;
    // Otherwise, include the entire column
    return col;
  });

  // Build the table structure
  const tableCells = [headerRow, contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}
