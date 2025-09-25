/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // For this layout, expect two columns:
  //  - Left: Heading (h2)
  //  - Right: Paragraph + Button
  // This matches the screenshot and the source HTML

  // Find the heading (h2)
  const heading = gridChildren.find((el) => el.tagName === 'H2');

  // Find the right column content (the div with paragraph and button)
  const rightCol = gridChildren.find((el) => el !== heading);

  // Defensive: If missing, fallback to empty cell
  const leftCell = heading || document.createElement('div');
  const rightCell = rightCol || document.createElement('div');

  // Table header
  const headerRow = ['Columns (columns8)'];
  // Table content row: two columns
  const contentRow = [leftCell, rightCell];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
