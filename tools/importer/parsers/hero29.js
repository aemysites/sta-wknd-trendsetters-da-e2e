/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Ensure element exists
  if (!element) return;

  // 1. Table header row
  const headerRow = ['Hero (hero29)'];

  // 2. Background image row (row 2)
  let bgImgEl = null;
  // Find image element (background)
  // The image is inside a div with class 'ix-parallax-scale-out-hero', which is a child of the first grid cell
  const gridDivs = element.querySelectorAll(':scope > div > div');
  // Defensive: Look for .ix-parallax-scale-out-hero
  for (const div of gridDivs) {
    if (div.classList.contains('ix-parallax-scale-out-hero')) {
      bgImgEl = div.querySelector('img');
      break;
    }
  }
  // If not found, fallback: look for any img inside element
  if (!bgImgEl) {
    bgImgEl = element.querySelector('img');
  }
  const imageRow = [bgImgEl ? bgImgEl : ''];

  // 3. Content row (row 3)
  // Find the content container (second grid cell)
  let contentCell = null;
  // The content is inside a div with class 'container' (second grid cell)
  const gridCells = element.querySelectorAll(':scope > div > div');
  for (const cell of gridCells) {
    if (cell.classList.contains('container')) {
      // The heading is inside a div.utility-margin-bottom-6rem > h1
      const contentWrapper = cell.querySelector('.utility-margin-bottom-6rem');
      if (contentWrapper) {
        // Collect all direct children except empty button group
        const children = [];
        for (const child of contentWrapper.children) {
          // Only add non-empty elements
          if (child.tagName === 'H1' || (child.textContent && child.textContent.trim().length > 0)) {
            children.push(child);
          }
        }
        // If nothing found, fallback to cell
        contentCell = children.length ? children : [cell];
      } else {
        contentCell = [cell];
      }
      break;
    }
  }
  // If not found, fallback: try to find h1 anywhere
  if (!contentCell) {
    const h1 = element.querySelector('h1');
    contentCell = h1 ? [h1] : [''];
  }
  const contentRow = [contentCell];

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
