/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two main columns (background image, content)
  const topDivs = element.querySelectorAll(':scope > div');
  if (topDivs.length < 2) return;

  // 1. Background image (absolute positioned)
  const bgDiv = topDivs[0];
  const bgImg = bgDiv.querySelector('img');
  // Use the actual <img> element if present
  const bgCell = [bgImg ? bgImg.cloneNode(true) : ''];

  // 2. Content column
  const contentDiv = topDivs[1];
  // Find the card body (contains all text, images, cta)
  const cardBody = contentDiv.querySelector('.card-body');
  const mainContent = cardBody || contentDiv;
  // Find the inner grid (contains the left image and right text/button)
  const innerGrid = mainContent.querySelector('.grid-layout');
  let leftImg = null;
  let rightContent = null;
  if (innerGrid) {
    const innerGridChildren = innerGrid.querySelectorAll(':scope > *');
    for (const child of innerGridChildren) {
      if (child.tagName === 'IMG' && !leftImg) {
        leftImg = child.cloneNode(true);
      } else if (!rightContent) {
        rightContent = child.cloneNode(true);
      }
    }
  }

  // Compose row 3: left image + right content (as in screenshot)
  const row3Content = document.createElement('div');
  row3Content.style.display = 'flex';
  row3Content.style.gap = '2rem';
  if (leftImg) row3Content.appendChild(leftImg);
  if (rightContent) row3Content.appendChild(rightContent);
  const contentRow = [row3Content];

  // Compose the table
  const headerRow = ['Hero (hero12)'];
  const cells = [
    headerRow,
    bgCell,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  if (table) element.replaceWith(table);
}
