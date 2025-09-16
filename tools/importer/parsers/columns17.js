/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid of columns (images)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate child column divs
  const columnDivs = Array.from(grid.children);

  // For each column, extract the image element (if present)
  const images = columnDivs.map(col => {
    // Find the first img inside this column
    const img = col.querySelector('img');
    return img || '';
  });

  // Table header row
  const headerRow = ['Columns (columns17)'];
  // Table content row: one cell per image
  const contentRow = images;

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
