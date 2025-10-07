/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row for Columns block
  const headerRow = ['Columns block (columns33)'];

  // Defensive: find the grid layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two: image and content container)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: image
  const imageEl = gridChildren.find(el => el.tagName === 'IMG');
  // Second column: content container (text)
  const contentEl = gridChildren.find(el => el !== imageEl);

  // Defensive: ensure both columns exist
  if (!imageEl || !contentEl) return;

  // For the right column, gather all relevant content as a single block
  // This includes: eyebrow, tag, h2, author/role/date
  // We'll reference the contentEl directly for resilience

  // Build the table rows
  const columnsRow = [imageEl, contentEl];

  // Compose the table
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
