/* global WebImporter */
export default function parse(element, { document }) {
  // --- HERO (hero13) BLOCK PARSER ---
  // 1. Find background image (row 2)
  let bgImg = null;
  const bgImgDiv = element.querySelector('img.cover-image.utility-position-absolute');
  if (bgImgDiv) bgImg = bgImgDiv;

  // 2. Find overlay card: contains left image and right content (row 3)
  let overlayGrid = null;
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    overlayGrid = cardBody.querySelector('.grid-layout');
  }
  // Defensive fallback
  if (!overlayGrid && cardBody) overlayGrid = cardBody;

  // 2a. Left image (group photo)
  let leftImg = null;
  if (overlayGrid) {
    leftImg = overlayGrid.querySelector('img.cover-image.utility-aspect-1x1');
  }

  // 2b. Right content: heading, list, CTA
  let rightContentDiv = null;
  if (overlayGrid) {
    const divs = overlayGrid.querySelectorAll('div');
    for (const d of divs) {
      if (d.querySelector('h2')) {
        rightContentDiv = d;
        break;
      }
    }
  }

  // Compose right content (heading, list, button)
  const rightContentFrag = document.createDocumentFragment();
  if (rightContentDiv) {
    // Heading
    const heading = rightContentDiv.querySelector('h2');
    if (heading) rightContentFrag.appendChild(heading);
    // List (vertical flex)
    const flexVertical = rightContentDiv.querySelector('.flex-vertical');
    if (flexVertical) rightContentFrag.appendChild(flexVertical);
    // Button group (CTA)
    const buttonGroup = rightContentDiv.querySelector('.button-group');
    if (buttonGroup) rightContentFrag.appendChild(buttonGroup);
  }

  // Compose overlay (left image + right content)
  const overlayDiv = document.createElement('div');
  overlayDiv.style.display = 'flex';
  overlayDiv.style.gap = '2rem';
  if (leftImg) overlayDiv.appendChild(leftImg);
  if (rightContentFrag.childNodes.length > 0) overlayDiv.appendChild(rightContentFrag);

  // Table rows
  const headerRow = ['Hero (hero13)'];
  const row2 = [bgImg ? bgImg : ''];
  const row3 = [overlayDiv];
  const cells = [headerRow, row2, row3];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
