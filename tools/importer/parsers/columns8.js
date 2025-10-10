/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for columns block (columns8)
  const headerRow = ['Columns block (columns8)'];

  // Defensive: find the grid container (should be the first child)
  const grid = element.querySelector(':scope > div');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Left column: heading (h2)
  const leftCol = gridChildren.find((child) => child.tagName === 'H2');
  // Right column: the next div (contains paragraph and button)
  const rightCol = gridChildren.find((child) => child.tagName === 'DIV');

  // Defensive: if not found, fallback to first and second child
  const leftContent = leftCol || gridChildren[0];
  const rightContent = rightCol || gridChildren[1];

  // Table content row: two columns
  const contentRow = [leftContent, rightContent];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
