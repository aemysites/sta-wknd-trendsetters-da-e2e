/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all immediate children divs of the main grid
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // The first child div contains the background image collage
  const bgDiv = grid.children[0];
  // Defensive: ensure bgDiv exists
  let backgroundImagesContainer = null;
  if (bgDiv) {
    // The actual images are inside a .grid-layout.desktop-3-column
    const collage = bgDiv.querySelector('.grid-layout.desktop-3-column');
    if (collage) {
      backgroundImagesContainer = collage;
    }
  }

  // The second child div contains the content (title, subheading, CTAs)
  const contentDiv = grid.children[1];
  let contentContainer = null;
  if (contentDiv) {
    // The actual content is inside .container.small-container
    const container = contentDiv.querySelector('.container.small-container');
    if (container) {
      contentContainer = container;
    }
  }

  // Build the table rows
  const headerRow = ['Hero (hero20)'];
  const bgRow = [backgroundImagesContainer ? backgroundImagesContainer : ''];
  const contentRow = [contentContainer ? contentContainer : ''];

  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
