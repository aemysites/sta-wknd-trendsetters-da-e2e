/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block parsing
  // 1. Header row
  const headerRow = ['Cards (cards19)'];

  // 2. Find all card elements (each direct child div of the grid container)
  const cardDivs = Array.from(element.children).filter(child => child.tagName === 'DIV');

  // 3. Build rows: each card gets a row [icon, text]
  const rows = cardDivs.map(card => {
    // Find the icon image (SVG)
    let iconImg = card.querySelector('.icon img');
    // Defensive: if not found, fallback to any img inside card
    if (!iconImg) {
      iconImg = card.querySelector('img');
    }

    // Find the text content (all text, not just <p>)
    // Instead of just the <p>, collect all text nodes and elements except the icon
    const iconContainer = card.querySelector('.icon');
    // Clone card and remove icon
    const cardClone = card.cloneNode(true);
    const iconClone = cardClone.querySelector('.icon');
    if (iconClone) iconClone.remove();
    // Get all remaining child nodes (should be text content)
    let textCellContent = [];
    // If there are elements left, push them all
    Array.from(cardClone.childNodes).forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        textCellContent.push(node);
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        // Wrap text node in a paragraph
        const p = document.createElement('p');
        p.textContent = node.textContent.trim();
        textCellContent.push(p);
      }
    });
    // If nothing found, fallback to card text
    if (textCellContent.length === 0) {
      const p = document.createElement('p');
      p.textContent = card.textContent.trim();
      textCellContent = [p];
    }

    // Return row: [icon, text]
    return [iconImg, textCellContent];
  });

  // 4. Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // 5. Replace the original element
  element.replaceWith(table);
}
