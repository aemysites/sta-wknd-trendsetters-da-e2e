/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid (should be two columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: text content
  const leftCol = columns[0];
  // Second column: image (or other media)
  const rightCol = columns[1];

  // Compose left column content (preserve all child elements in order)
  const leftContent = Array.from(leftCol.childNodes).filter(node => {
    // Remove empty text nodes
    return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
  });

  // Compose right column content (image or all children)
  let rightContent = [];
  if (rightCol.tagName === 'IMG') {
    rightContent = [rightCol];
  } else {
    rightContent = Array.from(rightCol.childNodes).filter(node => {
      return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
    });
  }

  // Build table rows
  const headerRow = ['Columns (columns28)'];
  const contentRow = [leftContent, rightContent];

  const cells = [headerRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
