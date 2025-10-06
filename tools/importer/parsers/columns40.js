/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns (columns40)'];

  // Get all direct child divs (each is a column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each column is the image inside the child div (reference the actual DOM node)
  const columns = columnDivs.map((col) => {
    const img = col.querySelector('img');
    return img ? img : '';
  });

  // Build the table rows
  const rows = [
    headerRow,
    columns,
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
