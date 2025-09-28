/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two columns (left: text, right: image)
  const cols = Array.from(grid.children);
  if (cols.length < 2) return;

  // Always reference the original elements (no cloning)
  const leftCol = cols[0];
  const rightCol = cols[1];

  // Table header must match block name exactly
  const headerRow = ['Columns (columns28)'];

  // Second row: left and right columns as DOM references
  const secondRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow
  ], document);

  // Replace the section with the new table
  element.replaceWith(table);
}
