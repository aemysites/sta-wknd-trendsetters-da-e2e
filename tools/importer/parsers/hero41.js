/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main grid inside the header
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // The grid has two children: image (background) and content
  const gridChildren = grid.children;
  if (gridChildren.length < 2) return;

  // --- Extract background image (row 2) ---
  const imageDiv = gridChildren[0];
  const img = imageDiv.querySelector('img');
  // Reference the existing image element (do not clone or create new)
  const imageCell = img ? img : '';

  // --- Extract content (row 3) ---
  const contentDiv = gridChildren[1];
  // Find heading (h1-h6)
  const heading = contentDiv.querySelector('h1, h2, h3, h4, h5, h6');
  // Find subheading/paragraph
  const subheading = contentDiv.querySelector('p');
  // Find CTA (anchor)
  const cta = contentDiv.querySelector('a');

  // Compose content cell, preserving order and semantics
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // --- Table construction ---
  // CRITICAL: Use the exact block name as header
  const headerRow = ['Hero (hero41)'];
  const rows = [
    headerRow,
    [imageCell],
    [contentCell.length ? contentCell : '']
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
