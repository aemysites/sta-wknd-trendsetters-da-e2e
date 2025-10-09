/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (holds columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of grid (should be: left column, right column, image)
  const gridChildren = Array.from(grid.children);

  // Left column: text content (eyebrow, headline, subheading)
  const leftCol = gridChildren.find((el) => el.querySelector('h2.eyebrow') && el.querySelector('h3.h2-heading'));

  // Right column: contact info list (ul)
  const rightCol = gridChildren.find((el) => el.tagName === 'UL');

  // Image: find img element (not SVG)
  const img = gridChildren.find((el) => el.tagName === 'IMG');

  // Defensive: ensure all columns exist
  if (!leftCol || !rightCol || !img) return;

  // Table header row
  const headerRow = ['Columns block (columns9)'];

  // Table second row: two columns
  const columnsRow = [leftCol, rightCol];

  // Table third row: image spanning both columns
  // To span, put image in a single cell (the app will handle spanning)
  const imageRow = [img];

  // Compose table cells
  const cells = [
    headerRow,
    columnsRow,
    imageRow,
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
