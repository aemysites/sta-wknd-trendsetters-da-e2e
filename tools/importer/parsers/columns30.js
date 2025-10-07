/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns30)'];

  // Defensive: Get all immediate child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its main content (image or other)
  const contentRow = columns.map((col) => {
    // Find the first image inside this column
    const img = col.querySelector('img');
    if (img) return img;
    // If no image, return the column itself (fallback)
    return col;
  });

  // Build the table: header row, then content row with images side by side
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
