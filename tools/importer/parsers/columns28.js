/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: all content except image
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // Collect left column content (preserve all children, reference not clone)
  const leftContent = Array.from(leftCol.children);
  // Collect right column content (image element only, reference not clone)
  const rightContent = [rightCol];

  // Table header must match target block name exactly
  const headerRow = ['Columns block (columns28)'];
  const contentRow = [leftContent, rightContent];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
