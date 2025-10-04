/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two: left column, right column)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: all text and button
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // Compose the left column cell: all children as a group (reference, do not clone)
  const leftCellContent = Array.from(leftCol.childNodes).filter(node => {
    // Only include elements and non-empty text nodes
    return node.nodeType !== Node.TEXT_NODE || node.textContent.trim().length > 0;
  });

  // Compose the right column cell: just the image (reference, do not clone)
  let rightCellContent = [];
  if (rightCol.tagName === 'IMG') {
    rightCellContent = [rightCol];
  } else {
    const img = rightCol.querySelector('img');
    if (img) {
      rightCellContent = [img];
    } else {
      // fallback: all children
      rightCellContent = Array.from(rightCol.childNodes).filter(node => {
        return node.nodeType !== Node.TEXT_NODE || node.textContent.trim().length > 0;
      });
    }
  }

  // Build table rows
  const headerRow = ['Columns block (columns28)'];
  const contentRow = [leftCellContent, rightCellContent];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the block
  element.replaceWith(block);
}
