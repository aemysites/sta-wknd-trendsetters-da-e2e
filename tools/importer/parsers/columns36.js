/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Left column: the main feature block (first a.utility-link-content-block)
  const leftCol = grid.querySelector('a.utility-link-content-block');
  if (!leftCol) return;

  // Right column: collect all right-side blocks (two with images, then text-only blocks)
  // The right side is two flex-horizontal.flex-vertical.flex-gap-sm divs
  const rightGroups = grid.querySelectorAll('div.flex-horizontal.flex-vertical.flex-gap-sm');
  if (rightGroups.length < 2) return;

  // Top right: two feature blocks with images
  const rightTopBlocks = Array.from(rightGroups[0].querySelectorAll(':scope > a.utility-link-content-block'));
  // Bottom right: text-only features (separated by dividers)
  const rightBottomBlocks = Array.from(rightGroups[1].querySelectorAll(':scope > a.utility-link-content-block'));

  // Compose the second row (columns): left, right-top-1, right-top-2, ... right-bottom blocks
  const columns = [leftCol, ...rightTopBlocks, ...rightBottomBlocks];

  // Table header
  const headerRow = ['Columns block (columns36)'];
  // Table second row: one cell per column
  const secondRow = columns;

  // Create table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
