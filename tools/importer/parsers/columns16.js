/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns16)'];

  // Find the grid container (the direct child of the centered width container)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each direct child of the grid is a column cell
  const columnDivs = Array.from(grid.children);

  // For this block, each column contains an image inside nested divs
  // We'll extract the image element from each column
  const images = columnDivs.map(col => {
    // Find the first image inside the column
    const img = col.querySelector('img');
    return img || document.createTextNode('');
  });

  // The columns block expects the second row to have as many columns as needed
  const columnsRow = images;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
