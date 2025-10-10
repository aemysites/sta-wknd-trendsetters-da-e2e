/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required block name header
  const headerRow = ['Columns block (columns39)'];

  // Get all immediate child divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For this block, each column contains a single image
  // Defensive: Only include columns that contain an image
  const cells = columns.map(col => {
    const img = col.querySelector('img');
    // Reference the existing image element directly
    return img ? img : '';
  });

  // Compose the table rows
  const rows = [
    headerRow,
    cells,
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
