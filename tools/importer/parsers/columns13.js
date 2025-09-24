/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (holds the columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Header row as specified
  const headerRow = ['Columns (columns13)'];

  // Second row: each column's content
  // Left column: heading (preserve heading element)
  let leftCell;
  const h2 = columns[0].querySelector('h2');
  leftCell = h2 ? h2 : columns[0];

  // Right column: paragraph and button (preserve both, reference DOM nodes)
  let rightCellNodes = [];
  const p = columns[1].querySelector('p');
  if (p) rightCellNodes.push(p);
  const a = columns[1].querySelector('a');
  if (a) rightCellNodes.push(a);
  // If neither found, fallback to the full column
  let rightCell = rightCellNodes.length ? rightCellNodes : [columns[1]];

  // Table expects each cell as a DOM node or array of DOM nodes
  const secondRow = [leftCell, rightCell];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
