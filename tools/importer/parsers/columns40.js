/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Columns block (columns40)'];

  // Get all immediate child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only include non-empty columns
  const images = columns.map(col => {
    // Find the image inside each column
    const img = col.querySelector('img');
    // Only include if image exists
    return img ? img : '';
  });

  // Build the table rows
  const cells = [
    headerRow,
    images // Second row: one cell per image (three columns)
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
