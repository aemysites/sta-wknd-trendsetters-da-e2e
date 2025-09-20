/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each is a column cell)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: only proceed if we have at least one column
  if (!columnDivs.length) return;

  // Header row as per target block requirement
  const headerRow = ['Columns (columns30)'];

  // Second row: each column cell contains the content of its respective div
  // Use the div itself as the cell content (resilient to variations)
  const columnsRow = columnDivs.map(div => div);

  // Compose the table cells array
  const cells = [
    headerRow,
    columnsRow
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
