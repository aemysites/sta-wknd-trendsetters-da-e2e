/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (main content area)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Left column: main heading and intro
  const leftCol = gridChildren.find(
    el => el.tagName === 'DIV' && el.querySelector('h2') && el.querySelector('h3')
  );

  // Right column: contact methods (ul)
  const rightCol = gridChildren.find(
    el => el.tagName === 'UL' && el.classList.contains('flex-horizontal')
  );

  // Image (bottom, spanning both columns visually)
  const img = grid.querySelector('img');

  // Compose left cell: heading, subheading, etc.
  const leftCellContent = [];
  if (leftCol) {
    Array.from(leftCol.children).forEach(child => {
      leftCellContent.push(child);
    });
  }

  // Compose right cell: contact methods
  const rightCellContent = [];
  if (rightCol) {
    Array.from(rightCol.children).forEach(li => {
      rightCellContent.push(li);
    });
  }

  // Table header
  const headerRow = ['Columns block (columns18)'];
  // Second row: two columns (left: heading/intro, right: contact methods)
  const secondRow = [leftCellContent, rightCellContent];
  // Third row: image spanning both columns (single cell, not two columns)
  const rows = [headerRow, secondRow];
  if (img) {
    // Only one cell, spanning both columns
    rows.push([[img.cloneNode(true)]]);
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
