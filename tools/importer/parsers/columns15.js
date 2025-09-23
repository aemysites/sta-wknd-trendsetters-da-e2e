/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns15)'];

  // Defensive: find the grid-layout container (the direct child of the main container)
  const grid = element.querySelector(':scope > .grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (should be 3 columns)
  const columns = Array.from(grid.children);
  // Defensive: if there are no columns, do nothing
  if (!columns.length) return;

  // Each column: collect its content (usually a single element, but could be more)
  // We'll put the entire column element in the cell for resilience
  const contentRow = columns.map(col => col);

  // Build the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
