/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout (two columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Identify image and content columns
  let imageEl = null;
  let contentEl = null;
  gridChildren.forEach((child) => {
    if (child.tagName === 'IMG') {
      imageEl = child;
    } else {
      contentEl = child;
    }
  });

  // Defensive: must have both columns
  if (!imageEl || !contentEl) return;

  // Extract heading, subheading, buttons from content column
  const heading = contentEl.querySelector('h1');
  const subheading = contentEl.querySelector('p');
  const buttonGroup = contentEl.querySelector('.button-group');

  // Compose content column: preserve semantic structure
  const contentColumn = document.createElement('div');
  if (heading) contentColumn.appendChild(heading);
  if (subheading) contentColumn.appendChild(subheading);
  if (buttonGroup) contentColumn.appendChild(buttonGroup);

  // Table rows
  const headerRow = ['Columns block (columns3)']; // CRITICAL: block name as header
  const columnsRow = [imageEl, contentColumn];

  // Create table using referenced elements
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
