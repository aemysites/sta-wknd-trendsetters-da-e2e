/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns4)'];

  // Defensive: find the grid-layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  let col1 = null;
  let col2 = null;

  if (grid) {
    // Get all direct children of the grid
    const gridChildren = Array.from(grid.children);
    // Defensive: expect two columns (left: heading/desc, right: buttons)
    col1 = gridChildren[0] || null;
    col2 = gridChildren[1] || null;
  }

  // Defensive: fallback if grid not found
  if (!col1 && !col2) {
    // fallback to all direct children of element
    const children = Array.from(element.children);
    col1 = children[0] || null;
    col2 = children[1] || null;
  }

  // Second row: as many columns as needed for the layout (here, 2)
  // Use the original elements directly in the cells
  const contentRow = [col1, col2];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
