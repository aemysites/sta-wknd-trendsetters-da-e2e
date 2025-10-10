/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of grid-layout (these are the columns)
  const cols = Array.from(grid.children);
  if (cols.length < 2) return;

  // Build the table rows
  const headerRow = ['Columns block (columns32)'];
  const cells = [
    [cols[0], cols[1]]
  ];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...cells,
  ], document);

  element.replaceWith(table);
}
