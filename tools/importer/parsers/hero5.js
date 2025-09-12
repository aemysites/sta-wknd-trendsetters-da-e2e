/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container (contains text and image)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Find the image (background/hero visual)
  const img = grid.querySelector('img');

  // Find the inner grid that contains the text content
  const innerGrid = grid.querySelector('.w-layout-grid.container');
  let contentBlock = null;
  if (innerGrid) {
    // The actual content is inside the first child div of innerGrid
    const contentDiv = innerGrid.querySelector('div.section');
    if (contentDiv) {
      // We'll reference the whole contentDiv for the text/CTA cell
      contentBlock = contentDiv;
    }
  }

  // Table header: always use block name
  const headerRow = ['Hero (hero5)'];

  // Second row: image (optional)
  const imageRow = [img ? img : ''];

  // Third row: text content (title, paragraph, CTA)
  const contentRow = [contentBlock ? contentBlock : ''];

  // Compose table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
