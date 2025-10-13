/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: if there are no columns, do not proceed
  if (!columns.length) return;

  // Build the header row exactly as required
  const headerRow = ['Columns block (columns15)'];

  // Each cell is the actual DOM node from the source (preserving semantic structure)
  const columnsRow = columns.map((col) => col);

  // Compose the table rows
  const tableRows = [headerRow, columnsRow];

  // Create the table using the utility
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
