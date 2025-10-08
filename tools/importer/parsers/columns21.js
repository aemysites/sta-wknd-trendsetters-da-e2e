/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row (block name)
  const headerRow = ['Columns block (columns21)'];

  // Find the grid container (holds all columns)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // For each column, extract all content (not just logo/icons or ul)
  const contentRow = Array.from(grid.children).map((col) => {
    // Clone the entire column, so all text and elements are included
    return col.cloneNode(true);
  });

  // Compose the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
