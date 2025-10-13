/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children of the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // Defensive: Expecting 2 columns (text, image)
  if (columns.length < 2) return;

  // Left column: all text and CTA
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // Compose left column content as a single cell
  // Collect all children in leftCol
  const leftColContent = Array.from(leftCol.childNodes).filter(node => {
    // Only include elements and non-empty text nodes
    if (node.nodeType === Node.ELEMENT_NODE) return true;
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) return true;
    return false;
  });

  // Compose right column content as a single cell
  // For columns block, images are referenced directly
  let rightColContent = rightCol;

  // Table structure
  const headerRow = ['Columns block (columns28)'];
  const contentRow = [leftColContent, rightColContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
