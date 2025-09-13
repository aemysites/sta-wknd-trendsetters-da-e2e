/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // Header row for the block table
  const headerRow = ['Columns block (columns14)'];

  // Find the grid container (columns)
  // Defensive: Find the first child with class 'w-layout-grid' or similar
  let grid = null;
  for (const child of element.children) {
    if (child.classList.contains('w-layout-grid')) {
      grid = child;
      break;
    }
  }
  if (!grid) return;

  // Get immediate children of the grid (these are the columns)
  // Defensive: Only include direct children
  const columnElements = Array.from(grid.children);

  // For this block, the first child is the heading column, the second is the content column
  // Defensive: If there are fewer than 2 columns, abort
  if (columnElements.length < 2) return;

  // First column: heading (h2)
  const headingCol = columnElements[0];

  // Second column: content (paragraph + button)
  const contentCol = columnElements[1];

  // Compose the second row with both columns
  const secondRow = [headingCol, contentCol];

  // Build the table data
  const cells = [headerRow, secondRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
