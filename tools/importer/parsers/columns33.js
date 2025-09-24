/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Extract columns: image and content
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imgCol = columns.find((el) => el.tagName === 'IMG');
  // Second column: content
  const contentCol = columns.find((el) => el.tagName !== 'IMG');

  // Ensure semantic content is preserved
  // Reference the actual image element, not clone or URL
  // Reference the actual content element

  // Table header row must match block name exactly
  const headerRow = ['Columns block (columns33)'];
  const columnsRow = [imgCol, contentCol];

  // Create table with two columns
  const table = WebImporter.DOMUtils.createTable([headerRow, columnsRow], document);

  // Replace original element
  element.replaceWith(table);
}
