/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block: extract each card's icon and text
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Find all direct card containers (each card is a flex-horizontal div)
  const cardDivs = Array.from(element.children);

  cardDivs.forEach(card => {
    // Icon: look for .icon > img inside the card
    const iconDiv = card.querySelector('.icon');
    let iconImg = null;
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }
    // Text: get all text content from the card except the icon
    // Remove the iconDiv from a clone, then take all text
    const cardClone = card.cloneNode(true);
    const iconDivClone = cardClone.querySelector('.icon');
    if (iconDivClone) iconDivClone.remove();
    // Get all text nodes (including from <p> and others)
    let textContent = '';
    Array.from(cardClone.childNodes).forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        textContent += node.textContent.trim() + '\n';
      } else if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent.trim() + '\n';
      }
    });
    textContent = textContent.trim();
    // Defensive: if no icon or no text, skip this card
    if (!iconImg || !textContent) return;
    // Add card row: [icon, text]
    rows.push([iconImg, textContent]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
