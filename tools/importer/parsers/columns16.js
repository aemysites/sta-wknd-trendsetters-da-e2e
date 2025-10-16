/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns16)'];

  // Find the grid container (the columns block)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each direct child of the grid is a column cell
  const columnDivs = Array.from(grid.children);

  // For this block, each column contains an image inside nested divs
  // We'll extract the innermost image element from each column
  const images = columnDivs.map(col => {
    // Find the first img descendant in this column
    const img = col.querySelector('img');
    return img || '';
  });

  // Compose the table rows
  const rows = [
    headerRow,
    images // This will create a row with one image per column
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
