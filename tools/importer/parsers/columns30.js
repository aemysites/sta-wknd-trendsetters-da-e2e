/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the correct block name for the header row
  const headerRow = ['Columns block (columns30)'];

  // Defensive: get all immediate children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For this block, each column contains a single image
  const contentRow = columns.map(col => {
    // Find the image inside each column
    const img = col.querySelector('img');
    // Reference the existing image element, do not clone or create new
    return img ? img : document.createTextNode(''); // fallback to empty if no image
  });

  // Build the table rows
  const rows = [headerRow, contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
