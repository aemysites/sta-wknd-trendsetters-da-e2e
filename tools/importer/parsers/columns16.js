/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required block name as the header row
  const headerRow = ['Columns block (columns16)'];

  // Defensive: Find the grid container (the direct child with the grid layout)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all the immediate children of the grid (each is a column cell)
  const gridCells = Array.from(grid.children);

  // For each grid cell, find the image inside (defensive: search for img inside any depth)
  const columns = gridCells.map(cell => {
    const img = cell.querySelector('img');
    return img ? img : '';
  });

  // Build the table rows
  const tableRows = [
    headerRow,
    columns
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
