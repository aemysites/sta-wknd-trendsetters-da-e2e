/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each column div contains an image (or other content)
  // Reference the div directly to preserve all content and semantics
  const columns = columnDivs.map(div => div);

  // Header row as specified in the instructions
  const headerRow = ['Columns block (columns38)'];

  // Second row: each column's content
  const contentRow = columns;

  // Compose table rows
  const rows = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
