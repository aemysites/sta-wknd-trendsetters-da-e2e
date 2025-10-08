/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero37) block: 1 column, 3 rows
  // Row 1: Header
  // Row 2: Background image (none in this example)
  // Row 3: Heading, subheading, CTA

  // Helper to get direct children divs
  const section = element;
  const container = section.querySelector('.container');
  const grid = container ? container.querySelector('.grid-layout') : null;

  // Defensive: fallback if structure changes
  let headingEl = null;
  let subheadingEl = null;
  let ctaEl = null;

  if (grid) {
    // Find the text and CTA columns
    const gridChildren = Array.from(grid.children);
    for (const child of gridChildren) {
      // Heading and subheading are in a div
      if (child.querySelector('h2')) {
        headingEl = child.querySelector('h2');
        subheadingEl = child.querySelector('p');
      }
      // CTA is an anchor
      if (child.tagName === 'A') {
        ctaEl = child;
      }
    }
  }

  // Compose content cell for row 3
  const contentCell = [];
  if (headingEl) contentCell.push(headingEl);
  if (subheadingEl) contentCell.push(subheadingEl);
  if (ctaEl) contentCell.push(ctaEl);

  // Table rows
  const headerRow = ['Hero (hero37)'];
  const imageRow = ['']; // No background image in this example
  const contentRow = [contentCell];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
