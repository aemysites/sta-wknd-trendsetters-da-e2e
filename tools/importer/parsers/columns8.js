/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block
  const headerRow = ['Columns (columns8)'];

  // Defensive: Find the grid layout (the actual columns container)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate children of the grid
  const columns = Array.from(grid.children);

  // There should be two columns: left (heading), right (paragraph + button)
  // Left column: heading (h2)
  const leftCol = columns[0];
  // Right column: paragraph + button
  const rightCol = columns[1];

  // Defensive: Make sure leftCol and rightCol exist
  if (!leftCol || !rightCol) return;

  // For left column: Use the heading element directly
  let leftContent = leftCol;
  // For right column: Grab all children (paragraph and button)
  let rightContent = Array.from(rightCol.children);

  // Table row: two columns, left and right
  const contentRow = [leftContent, rightContent];

  // Build the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
