/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (should be two: left column and right column)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: text content (author, heading, paragraphs, button)
  const leftCol = columns[0];
  // Second column: image
  const rightCol = columns[1];

  // Compose the left column cell: include all children as a fragment
  const leftColContent = Array.from(leftCol.childNodes).filter(node => {
    // Only include elements and non-empty text nodes
    return node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim());
  });

  // Compose the right column cell: just the image element
  const img = rightCol.tagName === 'IMG' ? rightCol : rightCol.querySelector('img');
  const rightColContent = img ? [img] : [];

  // Table header row
  const headerRow = ['Columns (columns28)'];
  // Table columns row
  const columnsRow = [leftColContent, rightColContent];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
