/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns40)'];

  // Get all immediate child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if at least one column exists
  if (!columns.length) return;

  // For this block, each column contains a single image element
  // We'll extract the image from each column div
  const imageCells = columns.map((col) => {
    // Find the first img element inside the column
    const img = col.querySelector('img');
    // Defensive: Only include if img exists
    return img ? img : '';
  });

  // Build the table cells array
  const cells = [
    headerRow,           // Header row (single column)
    imageCells           // Second row: one cell per column, each with its image
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
