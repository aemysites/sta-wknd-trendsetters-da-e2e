/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to defensively get the first matching element or null
  function getFirst(el, selector) {
    const found = el.querySelector(selector);
    return found || null;
  }

  // 1. Header row
  const headerRow = ['Hero (hero37)'];

  // 2. Background image row (none in this HTML)
  const bgImageRow = [''];

  // 3. Content row: title, subheading, CTA
  // Find the grid container (the direct child of .container)
  const grid = element.querySelector('.grid-layout');
  let contentCell = [];
  if (grid) {
    // The first div in the grid has the heading and subheading
    const contentDiv = grid.querySelector('div');
    if (contentDiv) {
      // Heading (h2)
      const heading = getFirst(contentDiv, 'h2');
      if (heading) contentCell.push(heading);
      // Subheading (p.subheading)
      const subheading = getFirst(contentDiv, 'p.subheading');
      if (subheading) contentCell.push(subheading);
    }
    // CTA button (a.button)
    const cta = grid.querySelector('a.button');
    if (cta) contentCell.push(cta);
  }
  // If nothing found, fallback to all content
  if (contentCell.length === 0) {
    contentCell = [element];
  }

  const contentRow = [contentCell];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImageRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
