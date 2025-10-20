/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Column 1: Heading and subheading
  const col1 = columns[0];
  // Column 2: Button group
  const col2 = columns[1];

  // Prepare table rows
  const headerRow = ['Columns block (columns4)'];
  const contentRow = [col1, col2];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
