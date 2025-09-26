/* global WebImporter */
export default function parse(element, { document }) {
  // Get top-level grid children
  const topDivs = Array.from(element.querySelectorAll(':scope > div'));

  // 1. Background image: first img.cover-image in first grid cell
  let bgImg = '';
  if (topDivs.length > 0) {
    const bgImgEl = topDivs[0].querySelector('img.cover-image');
    if (bgImgEl) bgImg = bgImgEl;
  }

  // 2. Content cell: headline, subheading, CTA, etc.
  let contentCell = '';
  if (topDivs.length > 1) {
    const cardBody = topDivs[1].querySelector('.card-body');
    if (cardBody) {
      const cellDiv = document.createElement('div');
      // Extract headline
      const headline = cardBody.querySelector('h2');
      if (headline) cellDiv.appendChild(headline.cloneNode(true));
      // Extract all vertical flex items (subheadings, paragraphs, icons, dividers, buttons)
      const flexVert = cardBody.querySelector('.flex-vertical');
      if (flexVert) {
        Array.from(flexVert.children).forEach(child => {
          if (child.classList.contains('flex-horizontal')) {
            cellDiv.appendChild(child.cloneNode(true));
          } else if (child.classList.contains('divider')) {
            cellDiv.appendChild(document.createElement('hr'));
          }
        });
      }
      // Button group (CTA)
      const btnGroup = cardBody.querySelector('.button-group');
      if (btnGroup) {
        cellDiv.appendChild(btnGroup.cloneNode(true));
      }
      if (cellDiv.hasChildNodes()) {
        contentCell = cellDiv;
      }
    }
  }

  // Table structure: always 3 rows
  const headerRow = ['Hero (hero13)'];
  const bgImgRow = [bgImg ? bgImg : ''];
  // Only include the third row if there is actual content
  const cells = [headerRow, bgImgRow];
  if (contentCell) {
    cells.push([contentCell]);
  } else {
    // If no content, do NOT add an empty row
  }

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
