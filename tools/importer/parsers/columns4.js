/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns wrapper)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: expect at least two columns (left: heading, right: text/button)
  if (columns.length < 2) return;

  // First column: heading (h2)
  const heading = columns[0];

  // Second column: content (paragraph + button)
  const content = columns[1];

  // Build the table rows
  const headerRow = ['Columns (columns4)'];
  const columnsRow = [heading, content];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
