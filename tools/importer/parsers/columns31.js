/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid-layout (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children of the grid (these are the columns)
  const cols = Array.from(grid.children);

  // Compose each column's content
  // Column 1: "Taylor Brooks"
  const col1 = cols[0];
  // Column 2: Tags + Heading
  const col2 = document.createElement('div');
  col2.appendChild(cols[1]); // tags group
  col2.appendChild(cols[2]); // heading
  // Column 3: Paragraphs
  const col3 = cols[3];

  // Build table rows
  const headerRow = ['Columns (columns31)'];
  const contentRow = [col1, col2, col3];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
