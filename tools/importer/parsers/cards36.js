/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards36) block parsing
  // 1. Header row
  const headerRow = ['Cards (cards36)'];

  // 2. Card rows: each card is a div.utility-aspect-1x1 containing an img
  //    Second column: alt text from image (as text content)
  const cardDivs = Array.from(element.querySelectorAll('.utility-aspect-1x1'));
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Use alt attribute for text cell (visible text content)
    // Also include any visible text nodes inside cardDiv (for flexibility)
    let textContent = img.getAttribute('alt') || '';
    // Collect additional text nodes inside cardDiv (if any)
    const textNodes = Array.from(cardDiv.childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim())
      .map(node => node.textContent.trim());
    if (textNodes.length) {
      textContent += (textContent ? '\n' : '') + textNodes.join('\n');
    }
    return [img, textContent];
  }).filter(Boolean);

  // 3. Table construction
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 4. Replace element
  element.replaceWith(table);
}
