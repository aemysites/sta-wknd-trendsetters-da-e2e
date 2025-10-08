/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid container (the columns block)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the immediate children of the grid
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting two main children: heading (left), content (right)
  const leftCol = gridChildren[0]; // h2
  const rightCol = gridChildren[1]; // div with paragraph and button

  // Compose the header row
  const headerRow = ['Columns block (columns13)'];

  // Compose the columns row
  const columnsRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
