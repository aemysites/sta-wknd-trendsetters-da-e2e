/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid (should be two columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Table header row: must match block name exactly
  const headerRow = ['Columns block (columns14)'];

  // First column: just the h2 element (if present)
  const h2 = columns[0].querySelector('h2');
  // Second column: all children of the second column
  const col2Children = Array.from(columns[1].children);

  // Only include columns that actually have content (no empty/null columns)
  const contentRow = [];
  if (h2) contentRow.push(h2);
  if (col2Children.length > 0) contentRow.push(col2Children);
  if (contentRow.length === 0) return; // Don't create a block if no columns

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the grid with the block (not the outer container)
  grid.replaceWith(block);
}
