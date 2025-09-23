/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be image and content)
  const gridChildren = Array.from(grid.children);

  // Find the image (first column)
  const img = gridChildren.find(el => el.tagName === 'IMG');
  // Find the content column (second column)
  const content = gridChildren.find(el => el !== img);

  // Defensive: ensure both columns exist
  if (!img || !content) return;

  // Block header row (must match exactly)
  const headerRow = ['Columns (columns3)'];
  // Second row: two columns, image and content
  const secondRow = [img, content];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
