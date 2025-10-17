/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container holding columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (should be columns)
  const columns = Array.from(grid.children);

  // Left column: heading
  const heading = columns.find(el => el.tagName === 'H2');

  // Right column: contains paragraph and button
  const rightCol = columns.find(el => el !== heading);
  let rightContent = [];
  if (rightCol) {
    // Get paragraph and button inside right column
    const paragraph = rightCol.querySelector('p');
    if (paragraph) rightContent.push(paragraph);
    const button = rightCol.querySelector('a, button');
    if (button) rightContent.push(button);
  }

  // Build table rows
  const headerRow = ['Columns block (columns8)'];
  const contentRow = [heading, rightContent];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
