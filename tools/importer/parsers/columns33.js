/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid
  const children = Array.from(grid.children);
  if (children.length < 2) return;

  // First column: image
  const img = children.find((el) => el.tagName === 'IMG');

  // Second column: content block (should be the div)
  const contentDiv = children.find((el) => el !== img);

  // Defensive: ensure both columns exist
  if (!img || !contentDiv) return;

  // Use the target block name exactly as header
  const headerRow = ['Columns (columns33)'];

  // Reference the actual DOM elements, not clones
  const columnsRow = [img, contentDiv];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, columnsRow], document);

  // Replace the section with the new block
  element.replaceWith(table);
}
