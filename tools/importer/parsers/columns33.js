/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout (columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be image and content)
  const gridChildren = Array.from(grid.children);
  // Find the image element
  const img = gridChildren.find((el) => el.tagName === 'IMG');
  // Find the content column (the other div)
  const contentDiv = gridChildren.find((el) => el !== img);

  // Header row
  const headerRow = ['Columns (columns33)'];

  // First column: image
  // Second column: all content
  const columnsRow = [img, contentDiv];

  // Build the table
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
