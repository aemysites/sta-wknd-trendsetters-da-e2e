/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (should be [img, content div])
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: image (reference the actual element)
  const leftCol = gridChildren[0]; // <img>

  // Right column: content block (reference the actual element)
  const rightCol = gridChildren[1];

  // Ensure all text content is included in the right column
  // No Section Metadata block in the example markdown, so do not create one
  // Table header must match target block name exactly
  const headerRow = ['Columns block (columns33)'];
  const contentRow = [leftCol, rightCol];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
