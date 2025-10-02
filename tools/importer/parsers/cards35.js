/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: 2 columns, multiple rows. Each row: [image, text content]
  const headerRow = ['Cards (cards35)'];
  const rows = [headerRow];

  // Get all immediate child divs (each is a card image container)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    if (!img) return; // Defensive: skip if no image

    // First cell: the image element itself
    const imageCell = img;

    // Second cell: extract all text content from the cardDiv (not just alt)
    // This ensures we capture any text nodes or elements that may be present
    let textCell = '';
    // Collect all text nodes inside cardDiv except inside <img>
    cardDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        textCell += node.textContent.trim() + ' ';
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'IMG') {
        textCell += node.textContent.trim() + ' ';
      }
    });
    textCell = textCell.trim();
    // If no text content found, fallback to alt attribute
    if (!textCell) {
      textCell = img.getAttribute('alt') || '';
    }

    rows.push([imageCell, textCell]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
