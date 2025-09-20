/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Locate the background image (first grid cell)
  let bgImg = null;
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (grid) {
    // The first child div contains the background image
    const firstCell = grid.children[0];
    if (firstCell) {
      bgImg = firstCell.querySelector('img');
    }
  }

  // 2. Locate the content area (second grid cell)
  let contentCell = null;
  if (grid) {
    const secondCell = grid.children[1];
    if (secondCell) {
      // The actual content is inside a nested grid
      const innerGrid = secondCell.querySelector('.w-layout-grid');
      if (innerGrid) {
        // Headline
        const headline = innerGrid.querySelector('h1');
        // Paragraph (subheading)
        const flex = innerGrid.querySelector('.flex-vertical');
        let subheading = null;
        let cta = null;
        if (flex) {
          subheading = flex.querySelector('p');
          const buttonGroup = flex.querySelector('.button-group');
          if (buttonGroup) {
            cta = buttonGroup.querySelector('a');
          }
        }
        // Compose content cell, preserving semantic structure
        contentCell = document.createElement('div');
        if (headline) contentCell.appendChild(headline);
        if (subheading) contentCell.appendChild(subheading);
        if (cta) contentCell.appendChild(cta);
      }
    }
  }

  // 3. Table rows: header, image, content
  const headerRow = ['Hero (hero41)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell ? contentCell : ''];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
