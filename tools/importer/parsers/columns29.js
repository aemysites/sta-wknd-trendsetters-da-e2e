/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, reference the div itself (preserves images and layout)
  const contentRow = columns.map(col => col);

  // Table header must match target block name exactly
  const headerRow = ['Columns block (columns29)'];

  // Compose table rows
  const rows = [headerRow, contentRow];

  // Create the table using WebImporter utility
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
