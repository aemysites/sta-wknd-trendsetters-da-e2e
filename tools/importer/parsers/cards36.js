/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards36) block: 2 columns, header row, each card = image + text
  const headerRow = ['Cards (cards36)'];
  const rows = [headerRow];

  // Get all immediate children (each is a card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    // First cell: image element (mandatory)
    const imageCell = img;
    // Second cell: Use alt text as the card title, and also include any text from child elements (for flexibility)
    let textCell = '';
    if (img && img.alt) {
      textCell += img.alt;
    }
    // Also include any text content from child elements (not just text nodes)
    cardDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        textCell += (textCell ? ' ' : '') + node.textContent.replace(/\s+/g, ' ').trim();
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textCell += (textCell ? ' ' : '') + node.textContent.replace(/\s+/g, ' ').trim();
      }
    });
    // Remove any markdown-style brackets from textCell
    textCell = textCell.replace(/\[([^\]]+)\]/g, '$1').trim();
    rows.push([imageCell, textCell]);
  });

  // Create the block table and replace original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
