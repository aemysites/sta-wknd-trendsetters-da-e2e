/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  const grid = element.querySelector('.grid-layout.grid-gap-xxl');
  if (!grid) return;
  const children = Array.from(grid.children);
  if (children.length < 2) return;

  // Identify content and image columns
  let contentCol = null;
  let imageCol = null;
  for (const child of children) {
    if (!contentCol && child.querySelector('h2')) contentCol = child;
    if (!imageCol && child.tagName === 'IMG') imageCol = child;
  }
  if (!contentCol || !imageCol) return;

  // Table header row must match the target block name exactly
  const headerRow = ['Columns block (columns5)'];
  const columnsRow = [contentCol, imageCol];
  const table = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(table, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
