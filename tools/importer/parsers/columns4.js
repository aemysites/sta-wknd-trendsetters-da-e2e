/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Table header row (must match target block name exactly)
  const headerRow = ['Columns block (columns4)'];

  // Second row: each column's content (reference, do not clone)
  const secondRow = columns.map((col) => col);

  // Compose the table data
  const tableData = [headerRow, secondRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
