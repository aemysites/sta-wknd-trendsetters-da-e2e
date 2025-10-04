/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get grid children (should be: image, content div)
  const gridChildren = Array.from(grid.children);
  const imgEl = gridChildren.find((el) => el.tagName === 'IMG');
  const contentDiv = gridChildren.find((el) => el !== imgEl);
  if (!imgEl || !contentDiv) return;

  // Use the block name as required
  const headerRow = ['Columns block (columns3)'];
  const columnsRow = [imgEl, contentDiv];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
