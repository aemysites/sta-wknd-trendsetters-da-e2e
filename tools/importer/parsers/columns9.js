/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Identify children: left text, right contacts, image
  let leftContent = null;
  let rightContent = null;
  let imageContent = null;

  gridChildren.forEach((child) => {
    if (child.tagName === 'DIV' && !leftContent) {
      leftContent = child;
    } else if (child.tagName === 'UL' && !rightContent) {
      rightContent = child;
    } else if (child.tagName === 'IMG' && !imageContent) {
      imageContent = child;
    }
  });

  // Defensive: ensure both columns exist
  if (!leftContent || !rightContent) return;

  // Table header: must match target block name exactly
  const headerRow = ['Columns block (columns9)'];

  // First row: left (text), right (contacts)
  const columnsRow = [leftContent, rightContent];

  // Second row: image spanning both columns (remove unnecessary empty cell)
  const imageRow = [imageContent];

  // Compose table
  const cells = [
    headerRow,
    columnsRow,
    imageRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
