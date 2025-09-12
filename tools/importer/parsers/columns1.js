/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two columns
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image (as cell)
  const imgCell = columns[0].querySelector('img');
  // Second column: all content (as cell)
  const contentCell = columns[1];

  // Only include non-null cells
  const contentRow = [];
  if (imgCell) contentRow.push(imgCell);
  if (contentCell) contentRow.push(contentCell);

  // Table header
  const headerRow = ['Columns block (columns1)'];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
