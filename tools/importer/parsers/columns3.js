/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the two main columns: left (image), right (content)
  const children = Array.from(grid.children);
  if (children.length < 2) return;

  // First column: image
  const imageEl = children.find((el) => el.tagName === 'IMG');
  // Second column: content (heading, subheading, buttons)
  const contentEl = children.find((el) => el !== imageEl);

  if (!imageEl || !contentEl) return;

  // Use references to the existing DOM nodes
  const headerRow = ['Columns (columns3)'];
  const columnsRow = [imageEl, contentEl];

  // Create the columns table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  element.replaceWith(table);
}
