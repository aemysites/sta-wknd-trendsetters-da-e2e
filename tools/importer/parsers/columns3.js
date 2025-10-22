/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all direct children of the grid layout
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Defensive: Expecting two columns (image, content)
  let imageEl = null;
  let contentEl = null;
  if (children.length >= 2) {
    imageEl = children[0];
    contentEl = children[1];
  } else {
    // fallback: try to find image and content
    imageEl = grid.querySelector('img');
    contentEl = grid.querySelector('div');
  }

  // Table header
  const headerRow = ['Columns block (columns3)'];

  // First column: image
  // Use the actual image element
  const imgCell = imageEl;

  // Second column: heading, subheading, buttons
  // Compose content cell
  let contentCell = [];
  if (contentEl) {
    // Find heading
    const heading = contentEl.querySelector('h1');
    if (heading) contentCell.push(heading);
    // Find subheading/paragraph
    const subheading = contentEl.querySelector('p');
    if (subheading) contentCell.push(subheading);
    // Find button group
    const buttonGroup = contentEl.querySelector('.button-group');
    if (buttonGroup) contentCell.push(buttonGroup);
  }

  // Table rows
  const rows = [
    headerRow,
    [imgCell, contentCell]
  ];

  // Create and replace block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
