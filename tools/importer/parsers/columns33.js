/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // The example shows: left column is image, right column is content
  // Find the image and the content div
  const imgCol = columns.find((el) => el.tagName === 'IMG');
  const contentCol = columns.find((el) => el !== imgCol);

  if (!imgCol || !contentCol) return;

  // Table header row: block name as required
  const headerRow = ['Columns block (columns33)'];
  // Table content row: image element, content element
  const contentRow = [imgCol, contentCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
