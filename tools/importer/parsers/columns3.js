/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the two columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid (should be 2: image and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imageEl = columns.find((col) => col.tagName === 'IMG');
  // Second column: content (heading, subheading, buttons)
  const contentEl = columns.find((col) => col !== imageEl);

  // Defensive: if image or content is missing, fallback to whatever is available
  const col1 = imageEl || columns[0];
  const col2 = contentEl || columns[1] || '';

  // Table header row
  const headerRow = ['Columns block (columns3)'];
  // Table content row: two columns
  const contentRow = [col1, col2];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
