/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be 2 columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: rich text content and button
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // Compose left column cell
  // Grab all children of leftCol
  const leftColChildren = Array.from(leftCol.children);
  // Defensive: Only include non-empty elements
  const leftColContent = leftColChildren.filter(el => {
    // Remove empty paragraphs or elements
    return el.textContent.trim() || el.tagName === 'A';
  });

  // Compose right column cell
  // Only the image element
  const img = rightCol.tagName === 'IMG' ? rightCol : rightCol.querySelector('img');
  const rightColContent = img ? [img] : [];

  // Table rows
  const headerRow = ['Columns (columns28)'];
  const contentRow = [leftColContent, rightColContent];

  // Create block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
