/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // There are two main vertical flex containers inside the grid:
  // 1. The left column: a large feature block (image, tag, heading, paragraph)
  // 2. The middle column: two stacked cards (each with image, tag, heading, paragraph)
  // 3. The right column: a vertical list of links (each with heading and paragraph)

  // The grid children are:
  // [0] <a> (main feature)
  // [1] <div> (verticalCards)
  // [2] <div> (verticalLinks)
  const children = Array.from(grid.children);
  if (children.length < 3) return;
  const mainFeature = children[0];
  const verticalCards = children[1];
  const verticalLinks = children[2];

  // Compose the columns for the second row
  // Each cell must reference the actual DOM element, not clone or create new
  const columnsRow = [mainFeature, verticalCards, verticalLinks];

  // Table header must match exactly
  const headerRow = ['Columns block (columns37)'];

  // Build the table rows
  const rows = [headerRow, columnsRow];

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
