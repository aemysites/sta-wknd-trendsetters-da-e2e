/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the inner container that holds the grid
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the grid layout inside the container
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Find the heading/subheading block and the CTA block
  let headingBlock = null;
  let ctaBlock = null;
  gridChildren.forEach(child => {
    // Heuristic: If contains h2, it's the heading block
    if (child.querySelector('h2')) {
      headingBlock = child;
    }
    // Heuristic: If it's a link/button, it's the CTA
    if (child.tagName === 'A' && child.classList.contains('button')) {
      ctaBlock = child;
    }
  });

  // Compose the content cell
  const contentCell = [];
  if (headingBlock) {
    // Get heading and subheading
    const h2 = headingBlock.querySelector('h2');
    if (h2) contentCell.push(h2);
    const subheading = headingBlock.querySelector('p');
    if (subheading) contentCell.push(subheading);
  }
  if (ctaBlock) {
    contentCell.push(ctaBlock);
  }

  // Table rows
  const headerRow = ['Hero (hero35)'];
  // No background image in this HTML, so second row is empty
  const imageRow = [''];
  // Third row: all content
  const contentRow = [contentCell];

  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
