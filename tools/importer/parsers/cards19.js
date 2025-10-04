/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the icon (img) from a card block
  function getIcon(cardDiv) {
    // Find the first .icon img inside the card
    const iconDiv = cardDiv.querySelector('.icon');
    if (iconDiv) {
      const img = iconDiv.querySelector('img');
      if (img) return img;
    }
    return '';
  }

  // Helper to extract the text content from a card block
  function getText(cardDiv) {
    // Find the first <p> inside the card
    const p = cardDiv.querySelector('p');
    if (p) return p;
    // Fallback: get all text nodes
    return document.createTextNode(cardDiv.textContent.trim());
  }

  // Get all immediate card children
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Build table rows
  const rows = [];
  // Always start with the block header
  rows.push(['Cards (cards19)']);

  cardDivs.forEach((cardDiv) => {
    const icon = getIcon(cardDiv);
    const text = getText(cardDiv);
    rows.push([
      icon ? icon : '',
      text ? text : '',
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
