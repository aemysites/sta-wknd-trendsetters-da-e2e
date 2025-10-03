/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the columns: image and content
  const gridChildren = Array.from(grid.children);
  const imgEl = gridChildren.find(el => el.tagName === 'IMG');
  const contentEl = gridChildren.find(el => el !== imgEl);

  // Defensive: Ensure both columns exist
  if (!imgEl || !contentEl) return;

  // Table header must match block name exactly
  const headerRow = ['Columns (columns33)'];
  // Table row: image column, content column
  const row = [imgEl, contentEl];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, row], document);

  // Replace the original element
  element.replaceWith(table);
}
