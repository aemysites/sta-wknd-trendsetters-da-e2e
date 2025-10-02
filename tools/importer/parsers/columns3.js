/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two columns: image and content
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imageCol = columns.find(el => el.tagName === 'IMG');
  // Second column: text and buttons
  const contentCol = columns.find(el => el !== imageCol);
  if (!imageCol || !contentCol) return;

  // Use the actual DOM nodes (do not clone or create new ones)
  const headerRow = ['Columns (columns3)'];
  const contentRow = [imageCol, contentCol];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original section with the table
  element.replaceWith(table);
}
