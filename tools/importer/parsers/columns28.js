/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Find the grid layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Step 2: Defensive check for correct number of columns (should be 2)
  if (gridChildren.length < 2) return;

  // Step 3: Reference the actual column elements (not clone, not create new)
  const leftCol = gridChildren[0]; // text and button
  const rightCol = gridChildren[1]; // image

  // Step 4: Ensure all text content is included (no text missed)
  // No Section Metadata block in the example markdown, so don't create one
  // No <hr> needed

  // Step 5: Table header must match block name exactly
  const headerRow = ['Columns (columns28)'];
  const columnsRow = [leftCol, rightCol];

  // Step 6: Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Step 7: Replace the original element with the new table
  element.replaceWith(table);
}
