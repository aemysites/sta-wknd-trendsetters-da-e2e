/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout for columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Expecting two columns: image and content
  let imageEl = null, contentEl = null;
  if (children.length === 2) {
    if (children[0].tagName === 'IMG') {
      imageEl = children[0];
      contentEl = children[1];
    } else if (children[1].tagName === 'IMG') {
      imageEl = children[1];
      contentEl = children[0];
    }
  } else {
    // Fallback: Try to find image and content
    imageEl = grid.querySelector('img');
    contentEl = grid.querySelector('div');
  }
  if (!imageEl || !contentEl) return;

  // Compose right column: heading, subheading, buttons
  const heading = contentEl.querySelector('h1');
  const subheading = contentEl.querySelector('p');
  const buttonGroup = contentEl.querySelector('.button-group');

  // Compose right column cell content
  const rightCol = [];
  if (heading) rightCol.push(heading);
  if (subheading) rightCol.push(subheading);
  if (buttonGroup) rightCol.push(buttonGroup);

  // Table rows
  const headerRow = ['Columns block (columns3)'];
  const columnsRow = [imageEl, rightCol];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}
