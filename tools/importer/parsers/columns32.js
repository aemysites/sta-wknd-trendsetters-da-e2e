/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // For this block, we want two columns: left (text/meta), right (image)
  // The first column is the text/meta
  // The second column is the image

  // Defensive: find the left and right columns
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Header row as required
  const headerRow = ['Columns (columns32)'];

  // Second row: left and right columns
  const secondRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
