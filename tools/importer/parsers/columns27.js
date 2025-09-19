/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (main content wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns visually)
  const columns = Array.from(grid.children).filter((child) => {
    // Filter out empty utility divs (like .utility-position-relative)
    if (child.tagName === 'DIV' && child.classList.contains('utility-position-relative')) return false;
    return true;
  });

  // Compose the cells for the columns row
  const contentRow = columns.map((col) => col);

  // Build the table data
  const tableData = [
    ['Columns (columns27)'], // Header row
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
