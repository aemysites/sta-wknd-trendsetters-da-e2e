/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Find all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Find left column: content block (heading, paragraph, buttons)
  let leftContent = null;
  for (const col of columns) {
    if (col.querySelector('h2')) {
      leftContent = col;
      break;
    }
  }

  // Find right column: image
  let rightImage = null;
  for (const col of columns) {
    if (col.tagName === 'IMG') {
      rightImage = col;
      break;
    }
  }

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns5)'];
  const contentRow = [leftContent, rightImage];

  // Create table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace original element with block table
  element.replaceWith(table);
}
