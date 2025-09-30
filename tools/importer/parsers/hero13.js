/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.w-layout-grid.grid-layout');

  // 1. Extract background image (first .cover-image in first grid child)
  let backgroundImg = null;
  if (grid && grid.children.length > 0) {
    const firstGridChild = grid.children[0];
    backgroundImg = firstGridChild.querySelector('img.cover-image');
  }

  // 2. Extract content (headline, subheading, CTA, etc.)
  let contentCell = document.createElement('div');
  if (grid && grid.children.length > 1) {
    const secondGridChild = grid.children[1];
    const cardBody = secondGridChild.querySelector('.card-body');
    if (cardBody) {
      // Headline (h2)
      const h2 = cardBody.querySelector('h2');
      if (h2) {
        contentCell.appendChild(h2);
      }
      // List of features (icon + text)
      const features = cardBody.querySelectorAll('.flex-horizontal');
      features.forEach(f => {
        const p = f.querySelector('p');
        if (p) {
          contentCell.appendChild(p);
        }
      });
      // CTA button
      const button = cardBody.querySelector('.button-group a.button');
      if (button) {
        contentCell.appendChild(button);
      }
    }
  }
  // If no content found, leave cell empty
  if (!contentCell.hasChildNodes()) {
    contentCell = '';
  }

  // Build table rows
  const headerRow = ['Hero (hero13)'];
  const bgImgRow = [backgroundImg ? backgroundImg : ''];
  const contentRow = [contentCell];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
