/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns block (columns15)'];

  // Find the grid-layout container (the direct child of the top-level container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: if there are no columns, do nothing
  if (!columns.length) return;

  // Each column cell will contain the full content of its respective div
  // We use the original elements (not clones) for resilience and to preserve structure
  const contentRow = columns;

  // Build the table rows array
  const rows = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
