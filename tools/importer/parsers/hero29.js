/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero29) block parsing
  // 1 column, 3 rows: [block name], [background image], [text content]

  // Header row
  const headerRow = ['Hero (hero29)'];

  // --- Background Image Row ---
  // Find the image element (background)
  let imgEl = null;
  const imgs = element.querySelectorAll('img');
  if (imgs.length > 0) {
    imgEl = imgs[0];
  }
  const imageRow = [imgEl ? imgEl : ''];

  // --- Text Content Row ---
  // Find the main heading (h1)
  let headingCell = '';
  const h1 = element.querySelector('h1');
  if (h1) {
    // Clone the h1 so we can manipulate it safely
    const h1Clone = h1.cloneNode(true);
    // Preserve <br> as a line break
    // We'll keep the innerHTML as is, but ensure it's a heading element
    const newH1 = document.createElement('h1');
    newH1.innerHTML = h1Clone.innerHTML;
    headingCell = newH1;
  }
  // Defensive: if not found, try h2
  if (!headingCell) {
    const h2 = element.querySelector('h2');
    if (h2) {
      const h2Clone = h2.cloneNode(true);
      const newH2 = document.createElement('h2');
      newH2.innerHTML = h2Clone.innerHTML;
      headingCell = newH2;
    }
  }

  // Compose text content cell
  const textRow = [headingCell ? headingCell : ''];

  // Compose table rows
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
