/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct children divs
  const topDivs = element.querySelectorAll(':scope > div');

  // --- Row 1: Block name ---
  const headerRow = ['Hero (hero12)'];

  // --- Row 2: Background image (optional) ---
  let backgroundImg = null;
  if (topDivs.length > 0) {
    const bgImgDiv = topDivs[0];
    backgroundImg = bgImgDiv.querySelector('img');
  }
  const backgroundRow = [backgroundImg ? backgroundImg : ''];

  // --- Row 3: Content (title, subheading, CTA, etc.) ---
  let contentCell = null;
  if (topDivs.length > 1) {
    const cardContainer = topDivs[1];
    const cardBody = cardContainer.querySelector('.card-body');
    if (cardBody) {
      const grid = cardBody.querySelector('.grid-layout');
      if (grid) {
        // Find the text/image area (not the first img)
        let textArea = null;
        for (let i = 0; i < grid.children.length; i++) {
          if (grid.children[i].tagName !== 'IMG') {
            textArea = grid.children[i];
          }
        }
        if (textArea) {
          // Collect all content in order: heading, all flex-vertical children, button group
          const blocks = [];
          // Heading
          const h2 = textArea.querySelector('h2');
          if (h2) blocks.push(h2.cloneNode(true));
          // All flex-vertical children (includes icons, paragraphs, dividers)
          const flexVertical = textArea.querySelector('.flex-vertical');
          if (flexVertical) {
            Array.from(flexVertical.children).forEach(child => {
              blocks.push(child.cloneNode(true));
            });
          }
          // Button group
          const buttonGroup = textArea.querySelector('.button-group');
          if (buttonGroup) blocks.push(buttonGroup.cloneNode(true));
          // If we found any blocks, wrap them in a fragment
          if (blocks.length > 0) {
            const frag = document.createDocumentFragment();
            blocks.forEach(node => frag.appendChild(node));
            contentCell = frag;
          }
        }
      }
    }
  }
  // Always add the third row, but only if there is content; otherwise omit the row
  const cells = [headerRow, backgroundRow];
  if (contentCell) {
    cells.push([contentCell]);
  }
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
