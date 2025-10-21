/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the two columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main columns (left: text, right: image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: contains all text, breadcrumbs, heading, byline, meta, social
  const leftCol = columns[0];
  // Right column: contains the image
  const rightCol = columns[1];

  // Table header row
  const headerRow = ['Columns (columns32)'];

  // Table content row: left and right columns
  const contentRow = [leftCol, rightCol];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
