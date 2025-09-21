/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero38)'];

  // 2. Background image row (none in this source)
  const bgImageRow = [''];

  // 3. Content row: Title, Subheading, CTA
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  let contentCell = [];
  if (grid) {
    // Get all direct children of the grid
    const gridChildren = Array.from(grid.children);
    // Find the content div (with heading and subheading)
    const contentDiv = gridChildren.find(child => child.querySelector('h2'));
    // Find the CTA (button/link)
    const ctaLink = gridChildren.find(child => child.tagName === 'A');

    // Collect elements for the content cell
    if (contentDiv) {
      // Find heading and subheading
      const heading = contentDiv.querySelector('h2');
      if (heading) contentCell.push(heading);
      const subheading = contentDiv.querySelector('p');
      if (subheading) contentCell.push(subheading);
    }
    if (ctaLink) {
      contentCell.push(ctaLink);
    }
  }

  // Defensive: if nothing found, fallback to all text content
  if (contentCell.length === 0) {
    contentCell = [element.textContent.trim()];
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
