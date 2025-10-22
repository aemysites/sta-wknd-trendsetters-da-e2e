/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Build the header row
  const headerRow = ['Columns block (columns21)'];

  // For each column, preserve the original column element (including its structure)
  // This ensures that <ul> wrappers and all nested content are preserved
  const secondRow = columns.map(col => col);

  // Compose the table cells array
  const cells = [headerRow, secondRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
