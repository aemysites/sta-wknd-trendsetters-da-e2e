/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout.container');
  if (!grid) return;

  // The left column is a div, the right column is an img
  let leftCol = null;
  let rightCol = null;
  for (const child of grid.children) {
    if (child.tagName === 'DIV' && !leftCol) {
      leftCol = child.cloneNode(true);
    } else if (child.tagName === 'IMG' && !rightCol) {
      rightCol = child.cloneNode(true);
    }
  }
  if (!leftCol || !rightCol) return;

  // Compose the table
  const headerRow = ['Columns block (columns5)'];
  const contentRow = [leftCol, rightCol];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the ENTIRE section (element) with the table
  element.replaceWith(table);
}
