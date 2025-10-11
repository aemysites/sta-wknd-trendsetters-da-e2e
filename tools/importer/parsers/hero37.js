/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero37)'];

  // --- Row 2: Background image (optional) ---
  // This hero has no background image (per screenshot and HTML)
  const imageRow = [''];

  // --- Row 3: Content (heading, subheading, CTA) ---
  // Defensive selectors for main content
  let heading = null;
  let subheading = null;
  let cta = null;

  // Find the grid layout container (contains both text and CTA)
  const grid = element.querySelector('.grid-layout');
  if (grid) {
    // Find all direct children (should be two: text block and CTA)
    const children = Array.from(grid.children);
    // Text block (first child)
    const textBlock = children.find(child => child.querySelector('h2') || child.querySelector('h1'));
    if (textBlock) {
      heading = textBlock.querySelector('h2, h1');
      subheading = textBlock.querySelector('p, .subheading');
    }
    // CTA (second child, anchor styled as button)
    cta = children.find(child => child.tagName === 'A' && child.classList.contains('button'));
    // If not found, try to find any anchor/button in grid
    if (!cta) {
      cta = grid.querySelector('a.button, button');
    }
  }

  // Compose content cell
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // If nothing found, fallback to all children
  if (contentCell.length === 0) {
    contentCell.push(...Array.from(element.children));
  }

  const contentRow = [contentCell];

  // Build table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
