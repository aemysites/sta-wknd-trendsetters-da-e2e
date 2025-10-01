/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each is a column)
  const columns = Array.from(grid.children);

  // Compose each column's content
  // First column: "Taylor Brooks" and tags
  // Second column: Heading and rich text
  // There may be more columns, but in this HTML there are two visually

  // Column 1: Name and tags
  const col1 = [];
  if (columns[0]) {
    col1.push(columns[0]); // "Taylor Brooks"
  }
  if (columns[1]) {
    col1.push(columns[1]); // tags block
  }

  // Column 2: Heading and rich text
  const col2 = [];
  if (columns[2]) {
    col2.push(columns[2]); // heading
  }
  if (columns[3]) {
    col2.push(columns[3]); // rich text
  }

  // Table header
  const headerRow = ['Columns (columns31)'];
  // Table content row (2 columns)
  const contentRow = [col1, col2];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
