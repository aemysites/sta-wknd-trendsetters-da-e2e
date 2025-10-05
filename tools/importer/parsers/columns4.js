/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // Defensive: Only proceed if there are at least two columns
  if (columns.length < 2) return;

  // Header row (block name)
  const headerRow = ['Columns block (columns4)'];

  // Second row: each column's content (reference actual elements, not clones)
  const secondRow = columns.map((col) => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
