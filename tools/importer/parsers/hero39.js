/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (top-level children)
  const gridDivs = element.querySelectorAll(':scope > div');

  // 1st grid child: contains the background image
  let bgImg = null;
  if (gridDivs.length > 0) {
    bgImg = gridDivs[0].querySelector('img');
  }

  // 2nd grid child: contains the text and CTA
  let contentBlock = [];
  if (gridDivs.length > 1) {
    const innerGrid = gridDivs[1].querySelector('.grid-layout');
    if (innerGrid) {
      Array.from(innerGrid.children).forEach((child) => {
        if (child.tagName.startsWith('H')) {
          contentBlock.push(child);
        } else if (child.classList.contains('flex-vertical')) {
          Array.from(child.children).forEach((subChild) => {
            contentBlock.push(subChild);
          });
        }
      });
    }
  }

  const headerRow = ['Hero (hero39)'];
  const imageRow = [bgImg ? bgImg : ''];
  // Always add the third row, even if empty (to match required structure)
  const contentRow = [contentBlock.length > 0 ? contentBlock : ''];

  const cells = [headerRow, imageRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
