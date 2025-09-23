/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Always use the required block name as header
  const headerRow = ['Columns block (columns39)'];

  // Each column: extract the image element (reference, not clone)
  const secondRow = columns.map((col) => {
    const img = col.querySelector('img');
    if (img) return img;
    // fallback: if no image, return empty string
    return '';
  });

  // Compose table data
  const tableData = [headerRow, secondRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original grid with the block table
  element.replaceWith(table);
}
