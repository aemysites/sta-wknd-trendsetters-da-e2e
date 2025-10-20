/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid container for columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the grid's direct children (columns)
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting two columns
  // Left: heading (h2)
  // Right: div with p + a
  const leftCol = gridChildren[0]; // h2
  const rightCol = gridChildren[1]; // div with p + a

  // Left cell: reference the heading element directly
  let leftCell = leftCol;

  // Right cell: include all children of rightCol (preserving semantic structure)
  let rightCellContents = [];
  if (rightCol) {
    rightCellContents = Array.from(rightCol.childNodes).filter(node => {
      // Only include elements and non-empty text nodes
      return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
    });
    // Defensive: If nothing found, fallback to rightCol itself
    if (rightCellContents.length === 0) rightCellContents = [rightCol];
  }

  // Table header must match block name exactly
  const headerRow = ['Columns (columns8)'];
  // Table content row: left and right columns
  const contentRow = [leftCell, rightCellContents];

  // Create the columns table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
