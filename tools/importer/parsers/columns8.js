/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get immediate children of the grid-layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Find heading (left column)
  const heading = children.find((el) => el.tagName === 'H2');

  // Find right column (contains paragraph and button)
  const rightCol = children.find((el) => el !== heading);

  // Defensive: get paragraph and button from right column
  let rightContent = [];
  if (rightCol) {
    // Get all children (paragraph, button)
    const p = rightCol.querySelector('p');
    if (p) rightContent.push(p);
    const btn = rightCol.querySelector('a, button');
    if (btn) rightContent.push(btn);
  }

  // Build table rows
  const headerRow = ['Columns (columns8)'];
  const contentRow = [heading, rightContent]; // left column: heading, right column: [paragraph, button]

  const cells = [headerRow, contentRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
