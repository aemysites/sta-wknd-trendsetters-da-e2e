/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns30)'];

  // Get all immediate children (columns) of the grid container
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the image element (if present)
  const cells = columns.map(col => {
    // Find the image inside this column
    const img = col.querySelector('img');
    // Defensive: Only include if image exists
    return img ? img : '';
  });

  // Build the table rows: header + content row
  const rows = [headerRow, cells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
