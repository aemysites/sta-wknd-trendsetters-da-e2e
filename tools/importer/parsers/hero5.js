/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero5)'];

  // 2. Find the main image (background/decorative)
  const img = element.querySelector('img');

  // 3. Find the main content container (with heading, paragraph, buttons)
  // The first grid child is the content, the second is the image
  const gridContainers = element.querySelectorAll(':scope > div > div');
  let contentContainer = null;
  if (gridContainers.length > 0) {
    contentContainer = gridContainers[0].querySelector(':scope > div');
    if (!contentContainer) contentContainer = gridContainers[0];
  }
  if (!contentContainer) {
    contentContainer = element.querySelector('h1, h2, h3, h4, h5, h6')?.parentElement;
  }

  // 4. Combine image and text/buttons into a single cell for the content row to match the two-column hero layout
  const contentCell = document.createElement('div');
  contentCell.style.display = 'flex';
  contentCell.style.alignItems = 'stretch';
  contentCell.style.gap = '2rem';
  contentCell.style.width = '100%';

  // Left: text content
  if (contentContainer) {
    const left = document.createElement('div');
    left.style.flex = '1';
    left.append(...Array.from(contentContainer.cloneNode(true).childNodes));
    contentCell.appendChild(left);
  }
  // Right: image
  if (img) {
    const right = document.createElement('div');
    right.style.flex = '1';
    right.style.display = 'flex';
    right.style.justifyContent = 'flex-end';
    right.appendChild(img.cloneNode(true));
    contentCell.appendChild(right);
  }

  // 5. Build the table: header row, then a single content row with both image and text side-by-side
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [contentCell],
  ], document);

  // 6. Replace the original element
  element.replaceWith(table);
}
