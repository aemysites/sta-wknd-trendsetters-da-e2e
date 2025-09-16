/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find image (background/hero visual)
  let imageEl = null;
  const imgs = grid.querySelectorAll('img');
  if (imgs.length > 0) {
    imageEl = imgs[0];
  }

  // Find text content container (contains heading, paragraph, buttons)
  let textContainer = null;
  // Look for a child div with an h2 (heading)
  const divs = grid.querySelectorAll(':scope > div');
  for (const div of divs) {
    if (div.querySelector('h2')) {
      textContainer = div;
      break;
    }
  }

  // Defensive: if not found, fallback to first div
  if (!textContainer && divs.length > 0) {
    textContainer = divs[0];
  }

  // Table header
  const headerRow = ['Hero (hero11)'];

  // Row 2: image only (if exists)
  const imageRow = [imageEl ? imageEl : ''];

  // Row 3: text content (heading, paragraph, buttons)
  const textRow = [textContainer ? textContainer : ''];

  // Build table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}
