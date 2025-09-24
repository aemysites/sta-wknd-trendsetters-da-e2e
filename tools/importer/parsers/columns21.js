/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container (holds columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all top-level column elements (children of grid)
  const columns = Array.from(grid.children);

  // Header row as specified
  const headerRow = ['Columns (columns21)'];

  // Second row: each column's content
  // For this footer, columns are:
  // 1. Logo + social icons
  // 2. Trends
  // 3. Inspire
  // 4. Explore
  // We'll reference each column's DOM directly for resilience
  const secondRow = columns.map(col => col);

  // Table: header row + columns row
  const cells = [headerRow, secondRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
