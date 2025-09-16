/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // 1. Header row as per spec
  const headerRow = ['Hero (hero14)'];

  // 2. Find the background image (row 2)
  // Look for the first <img> inside the element
  let bgImg = null;
  const imgs = element.querySelectorAll('img');
  if (imgs && imgs.length > 0) {
    bgImg = imgs[0];
  }

  // 3. Find the text content (row 3)
  // Look for the main heading (h1) and any subheading/buttons
  let textContent = null;
  // The text is in the second grid cell (the second direct child of .grid-layout)
  const grid = element.querySelector('.grid-layout');
  let textContainer = null;
  if (grid) {
    const gridChildren = grid.querySelectorAll(':scope > div');
    if (gridChildren.length > 1) {
      textContainer = gridChildren[1];
    }
  }
  // Defensive: fallback to any .h1-heading inside element
  if (!textContainer) {
    textContainer = element.querySelector('.h1-heading')?.parentElement;
  }
  if (textContainer) {
    textContent = textContainer;
  }

  // 4. Build the table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [textContent ? textContent : ''],
  ];

  // 5. Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 6. Replace the original element with the block table
  element.replaceWith(table);
}
