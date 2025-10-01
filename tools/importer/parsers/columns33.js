/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be image and content block)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Column 1: image
  const imageCol = columns.find(el => el.tagName === 'IMG');
  // Column 2: content (text, headings, etc)
  const contentCol = columns.find(el => el !== imageCol);

  // Defensive: If either column is missing, abort
  if (!imageCol || !contentCol) return;

  // Table header row
  const headerRow = ['Columns block (columns33)'];

  // Table content row: image in first column, content in second column
  const contentRow = [imageCol, contentCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
