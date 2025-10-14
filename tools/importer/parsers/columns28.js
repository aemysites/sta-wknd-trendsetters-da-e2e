/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns28)'];

  // Defensive: Find the grid layout container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be two columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: All text and CTA
  const leftCol = columns[0];
  // Right column: Image
  const rightCol = columns[1];

  // For left column, collect all its children as a single block
  // This ensures resilience to source variations
  const leftContent = Array.from(leftCol.childNodes).filter(node => {
    // Only include elements and non-empty text nodes
    return (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim()));
  });

  // For right column, use the image element directly
  let rightContent = null;
  const img = rightCol.tagName === 'IMG' ? rightCol : rightCol.querySelector('img');
  if (img) {
    rightContent = img;
  } else {
    // If not found, include all children as fallback
    rightContent = Array.from(rightCol.childNodes).filter(node => {
      return (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim()));
    });
  }

  // Build the table rows
  const rows = [
    headerRow,
    [leftContent, rightContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
