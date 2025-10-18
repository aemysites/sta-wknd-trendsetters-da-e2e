/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Identify the image and content columns flexibly
  let imageEl = null;
  let contentCol = null;
  children.forEach((child) => {
    if (!imageEl && child.tagName === 'IMG') {
      imageEl = child;
    } else if (!contentCol && child.querySelector && child.querySelector('h1')) {
      contentCol = child;
    }
  });

  // Fallbacks if not found
  if (!imageEl) imageEl = grid.querySelector('img');
  if (!contentCol) contentCol = grid.querySelector('div');

  // Compose left column (text content)
  let leftCellContent = [];
  if (contentCol) {
    // Collect all direct children (to preserve order and all text)
    leftCellContent = Array.from(contentCol.childNodes).filter(node => {
      // Keep elements and text nodes with non-empty text
      return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
    });
  }

  // Compose table rows
  const headerRow = ['Columns (columns3)'];
  const contentRow = [leftCellContent, imageEl];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
