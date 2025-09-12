/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container holding the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the two columns: image and content
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Table header must match block name exactly
  const headerRow = ['Columns (columns32)'];

  // Each column cell should reference the actual DOM node (not clone)
  const contentRow = columns;

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original section with the table
  element.replaceWith(table);
}
