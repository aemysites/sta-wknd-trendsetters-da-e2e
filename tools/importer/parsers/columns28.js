/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // 2. Get the two columns: left (content), right (image)
  // The left column is a div, the right column is an img
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  const leftCol = columns.find((el) => el.tagName === 'DIV');
  const rightCol = columns.find((el) => el.tagName === 'IMG');

  // Defensive: fallback if order is swapped
  if (!leftCol || !rightCol) return;

  // 3. Compose the table rows
  const headerRow = ['Columns (columns28)'];
  const columnsRow = [leftCol, rightCol];

  // 4. Build and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  element.replaceWith(table);
}
