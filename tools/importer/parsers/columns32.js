/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get columns: image and content
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imageEl = columns.find(el => el.tagName === 'IMG');
  // Second column: content block
  const contentEl = columns.find(el => el !== imageEl);

  if (!imageEl || !contentEl) return;

  // Table header row (must match block name exactly)
  const headerRow = ['Columns block (columns32)'];

  // Table content row: reference original elements
  const contentRow = [imageEl, contentEl];

  // Build table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace original element with table
  element.replaceWith(table);
}
