/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (image and content)
  const gridChildren = Array.from(grid.children);

  // Find the image element (first column)
  const imgEl = gridChildren.find(el => el.tagName === 'IMG');
  // Find the content element (second column)
  const contentEl = gridChildren.find(el => el !== imgEl);

  // Defensive: If either column is missing, abort
  if (!imgEl || !contentEl) return;

  // Build header row with exact required block name
  const headerRow = ['Columns (columns33)'];
  // Each column is a reference to the actual DOM element (not cloning)
  const columnsRow = [imgEl, contentEl];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original section with the new table
  element.replaceWith(table);
}
