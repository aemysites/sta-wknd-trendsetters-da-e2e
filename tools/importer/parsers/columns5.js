/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;

  // Identify left (text/buttons) and right (image) columns
  let leftCol = null;
  let rightCol = null;
  for (const child of Array.from(mainGrid.children)) {
    if (child.tagName === 'DIV' && !leftCol) {
      leftCol = child;
    } else if (child.tagName === 'IMG' && !rightCol) {
      rightCol = child;
    }
  }
  if (!leftCol || !rightCol) return;

  // Table header row: must match target block name exactly
  const headerRow = ['Columns (columns5)'];

  // Table second row: left cell (text/buttons), right cell (image)
  const secondRow = [leftCol, rightCol];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);

  // Replace the original section with the new table
  element.replaceWith(table);
}
