/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container (the direct child of .container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two columns: first is image, second is content
  // Defensive: Only select direct children
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  const imageCol = gridChildren[0]; // img
  const contentCol = gridChildren[1]; // div with h1, p, buttons

  // Table header row
  const headerRow = ['Columns (columns3)'];

  // Table content row: two columns
  const contentRow = [imageCol, contentCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
