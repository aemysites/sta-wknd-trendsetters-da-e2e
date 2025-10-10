/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero37)'];

  // 2. Background image row (empty, as there is no image in this hero)
  const bgImageRow = [''];

  // 3. Content row: Title, Subheading, CTA (button)
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  let contentCell = document.createElement('div');

  if (grid) {
    // The first child div: contains heading and subheading
    const contentDiv = grid.querySelector('div');
    // The anchor/button: CTA
    const cta = grid.querySelector('a, button');

    // Defensive: Only append if present
    if (contentDiv) {
      // Clone so we don't move original nodes
      Array.from(contentDiv.childNodes).forEach((node) => {
        contentCell.appendChild(node.cloneNode(true));
      });
    }
    if (cta) {
      // Add a space between text and button if needed
      contentCell.appendChild(document.createElement('br'));
      contentCell.appendChild(cta.cloneNode(true));
    }
  }

  const contentRow = [contentCell];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImageRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
