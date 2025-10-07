/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Left column: text content (first grid child)
  const leftCol = gridChildren[0];
  // Right column: contact list (the <ul>)
  const rightCol = gridChildren.find(el => el.tagName.toLowerCase() === 'ul');
  // Large image: find the image with a real src (not base64 SVG)
  const mainImage = gridChildren.find(el => el.tagName.toLowerCase() === 'img' && el.src && el.src.startsWith('http'));

  // Defensive: ensure all major pieces exist
  if (!leftCol || !rightCol || !mainImage) return;

  // Table header
  const headerRow = ['Columns block (columns9)'];

  // Columns row: leftCol and rightCol
  const columnsRow = [leftCol, rightCol];

  // Image row: large image in first cell, second cell contains ''
  const imageRow = [mainImage, ''];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
    imageRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
