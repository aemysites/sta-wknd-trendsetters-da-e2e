/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns block root)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each column)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // The first column is the left content (text, breadcrumbs, heading, meta, social)
  // The second column is the right content (image)
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Defensive: If more than 2 columns, combine all after first as rightCol
  let rightContent;
  if (columns.length > 2) {
    rightContent = document.createElement('div');
    columns.slice(1).forEach(col => rightContent.appendChild(col));
  } else {
    rightContent = rightCol;
  }

  // Build the table rows
  const headerRow = ['Columns block (columns32)'];
  const contentRow = [leftCol, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
