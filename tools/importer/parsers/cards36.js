/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards36) block: 2 columns, multiple rows. Each card: image (cell 1), text (cell 2)
  const headerRow = ['Cards (cards36)'];
  // Find all card containers (each card is a .utility-aspect-1x1 with an img inside)
  const cardDivs = Array.from(element.querySelectorAll('.utility-aspect-1x1'));

  // For each card, use the image and all text content inside the card div (not just alt text)
  const rows = cardDivs.map(div => {
    const img = div.querySelector('img');
    // Collect all text content from the card div (including alt text and any other text nodes)
    let textContent = '';
    // Get alt text if present
    if (img && img.getAttribute('alt')) {
      textContent += img.getAttribute('alt');
    }
    // Also include any other text nodes inside the div (if present)
    // (In this HTML, only alt text exists, but this makes it flexible)
    Array.from(div.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const txt = node.textContent.trim();
        if (txt) {
          textContent += (textContent ? '\n' : '') + txt;
        }
      }
    });
    return [img, textContent];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
