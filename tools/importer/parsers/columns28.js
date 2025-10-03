/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid (should be two: left content, right image)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: content block (text, heading, button)
  const leftCol = gridChildren[0];
  // Right column: image
  const rightCol = gridChildren[1];

  // Prepare left column content (grab all children, preserving semantic HTML)
  const leftContent = Array.from(leftCol.childNodes).filter(node => {
    // Only keep elements and non-empty text nodes
    if (node.nodeType === Node.ELEMENT_NODE) return true;
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) return true;
    return false;
  });

  // Prepare right column content (should be an image, reference the element directly)
  const rightContent = rightCol;

  // Compose the table rows
  const headerRow = ['Columns block (columns28)'];
  const columnsRow = [leftContent, rightContent];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
