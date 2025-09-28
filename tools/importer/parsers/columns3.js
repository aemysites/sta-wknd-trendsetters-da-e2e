/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the columns (image and content)
  const columns = Array.from(grid.children);

  // Prepare header row with the exact block name
  const headerRow = ['Columns (columns3)'];

  // Each column cell should reference the existing DOM element
  const contentRow = columns.map((col) => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
