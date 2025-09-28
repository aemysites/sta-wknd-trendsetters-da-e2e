/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Table header as required
  const headerRow = ['Columns block (columns30)'];

  // Each column cell is the original child div (preserves images/structure)
  const contentRow = columns.map(col => col);

  // Compose table rows
  const rows = [
    headerRow,
    contentRow,
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(table);
}
