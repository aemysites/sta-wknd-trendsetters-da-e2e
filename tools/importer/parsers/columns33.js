/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the two columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main columns: image and text stack
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imageEl = columns.find((el) => el.tagName === 'IMG');
  // Second column: text stack (the div)
  const textCol = columns.find((el) => el.tagName === 'DIV');

  // Defensive: if missing either, abort
  if (!imageEl || !textCol) return;

  // Build the table rows
  const headerRow = ['Columns (columns33)'];
  const contentRow = [imageEl, textCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
