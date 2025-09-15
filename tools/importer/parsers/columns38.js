/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Header row as required by block spec
  const headerRow = ['Columns (columns38)'];
  // Each column cell: reference the entire div (preserves images and semantics)
  const contentRow = columns.map(col => col);
  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element with block
  element.replaceWith(block);
}
