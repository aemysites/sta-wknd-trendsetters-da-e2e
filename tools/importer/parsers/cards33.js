/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block spec
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Get all card links (each card is an <a> inside the grid)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  cardLinks.forEach((card) => {
    // Each card contains an inner grid
    const innerGrid = card.firstElementChild;
    if (!innerGrid) return;

    // Find image (first child of inner grid)
    const img = innerGrid.querySelector('img');

    // Find text content (second child of inner grid)
    // Defensive: sometimes the structure may vary, so find the div after the image
    let textDiv = null;
    const children = Array.from(innerGrid.children);
    if (children.length > 1) {
      textDiv = children[1];
    } else {
      // fallback: find first div after img
      textDiv = innerGrid.querySelector('div:not(:has(img))');
    }
    if (!img || !textDiv) return;

    // Compose row: [image, text content div]
    rows.push([img, textDiv]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
