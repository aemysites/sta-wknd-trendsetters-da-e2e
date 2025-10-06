/* global WebImporter */
export default function parse(element, { document }) {
  // Find direct child divs
  const directDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Find background image (first direct child div with an img.cover-image)
  let backgroundImg = null;
  if (directDivs.length > 0) {
    const bgImgDiv = directDivs.find(div => div.querySelector('img.cover-image'));
    if (bgImgDiv) {
      backgroundImg = bgImgDiv.querySelector('img.cover-image');
    }
  }

  // Find card content (headline, subheading, CTA, etc.)
  let contentCell = '';
  if (directDivs.length > 1) {
    const cardDiv = directDivs[1];
    const cardBody = cardDiv.querySelector('.card-body');
    if (cardBody) {
      const h2 = cardBody.querySelector('h2');
      const flexVertical = cardBody.querySelector('.flex-vertical');
      const buttonGroup = cardBody.querySelector('.button-group');
      const frag = document.createElement('div');
      if (h2) frag.appendChild(h2.cloneNode(true));
      if (flexVertical) {
        const flexClone = flexVertical.cloneNode(true);
        flexClone.querySelectorAll('.icon-small').forEach(icon => icon.remove());
        frag.appendChild(flexClone);
      }
      if (buttonGroup) frag.appendChild(buttonGroup.cloneNode(true));
      if (frag.textContent.trim().length > 0) {
        contentCell = frag;
      } else {
        contentCell = null;
      }
    }
  }

  // Compose table rows (always 3 rows: header, bg image, content row)
  const headerRow = ['Hero (hero13)'];
  const bgImgRow = [backgroundImg ? backgroundImg : ''];
  // Always include the third row, but only if there is actual content, otherwise omit it
  const rows = [headerRow, bgImgRow];
  if (contentCell) {
    rows.push([contentCell]);
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
