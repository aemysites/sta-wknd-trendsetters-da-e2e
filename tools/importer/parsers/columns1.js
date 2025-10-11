/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block (columns1) parsing
  // Header row
  const headerRow = ['Columns block (columns1)'];

  // Defensive: Get all immediate children of the grid container
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: For each column, get its main content (usually one child)
  const colCells = columns.map(col => {
    // If the column contains an image, use the image element directly
    const img = col.querySelector('img');
    if (img) return img;
    // If not, use the column itself (for text or other inline content)
    return col;
  });

  // Build table rows
  const rows = [headerRow, colCells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
