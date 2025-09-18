/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Each card is a direct child <a> element
  const cardLinks = element.querySelectorAll(':scope > a');

  cardLinks.forEach((card) => {
    // Find the image (first img inside the card)
    const img = card.querySelector('img');

    // Find the text content container (the div after the img)
    // The structure is: <div class="w-layout-grid ..."><img ...><div>...</div></div>
    let textContent = null;
    const grid = card.querySelector(':scope > div');
    if (grid) {
      const divs = Array.from(grid.children).filter((el) => el.tagName === 'DIV');
      textContent = divs[0] || null;
    }

    // Defensive: If no image or text content, skip this card
    if (!img || !textContent) return;

    // Compose the row: [image, text content]
    rows.push([img, textContent]);
  });

  // Always replace the element, even if only header row exists
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
