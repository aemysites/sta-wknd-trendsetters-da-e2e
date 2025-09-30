/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: handle empty columns
  if (!columns.length) return;

  // Table header must match target block name exactly
  const headerRow = ['Columns block (columns30)'];

  // Each column cell references the original div (preserving images and semantics)
  const columnsRow = columns.map((col) => col);

  // Compose table data
  const tableData = [
    headerRow,
    columnsRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
