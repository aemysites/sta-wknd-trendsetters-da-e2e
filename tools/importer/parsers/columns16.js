/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required block name as the header
  const headerRow = ['Columns (columns16)'];

  // Find the grid container (the direct child with the grid of images)
  // Defensive: look for a child with class containing 'grid-layout'
  const grid = element.querySelector('[class*="grid-layout"]');
  if (!grid) return;

  // Each direct child of the grid is a column
  const columns = Array.from(grid.children).map((col) => {
    // Each column has a nested structure: col > ... > img
    // Defensive: find the first img descendant
    const img = col.querySelector('img');
    return img ? img : document.createTextNode('');
  });

  // Only create the row if we have at least one column
  if (columns.length === 0) return;

  // Build the table rows
  const tableRows = [
    headerRow,
    columns
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
