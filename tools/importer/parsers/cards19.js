/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block: 2 columns, multiple rows, each row = [icon, text]
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Find all immediate card children
  const cardDivs = Array.from(element.children);

  cardDivs.forEach(card => {
    // Icon: Find the first img inside .icon inside card
    let iconImg = null;
    const iconDiv = card.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }

    // Text: Get all text content from the card except the icon
    // Remove the iconDiv from a clone, then get the text
    const cardClone = card.cloneNode(true);
    if (iconDiv) {
      const iconClone = cardClone.querySelector('.icon');
      if (iconClone) iconClone.remove();
    }
    // Get all text nodes (including multiple paragraphs, if present)
    let textContent = '';
    Array.from(cardClone.childNodes).forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        textContent += node.textContent.trim() + '\n';
      } else if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent.trim();
      }
    });
    textContent = textContent.trim();
    // Defensive: Only add row if both icon and text are present
    if (iconImg && textContent) {
      rows.push([iconImg, textContent]);
    }
  });

  // Create and replace with block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
