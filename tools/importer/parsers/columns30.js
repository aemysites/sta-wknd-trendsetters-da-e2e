/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns30)'];

  // Get all direct children divs that represent columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its main image (reference the existing element)
  const columnCells = columns.map(col => {
    const img = col.querySelector('img');
    if (img) return img; // Reference the existing image element
    return '';
  });

  // Compose the table rows
  const rows = [
    headerRow,
    columnCells
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
