/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match block name exactly
  const headerRow = ['Cards (cards7)'];

  // Each card is a direct child div of the grid container
  const cardDivs = element.querySelectorAll(':scope > div');

  // For each card, extract image and all text content (including alt text if present)
  const rows = Array.from(cardDivs).map(cardDiv => {
    const img = cardDiv.querySelector('img');
    let textContent = '';
    // Collect all text from descendants except images
    const walker = document.createTreeWalker(cardDiv, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let node;
    let parts = [];
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) {
        const txt = node.textContent.trim();
        if (txt) parts.push(txt);
      }
    }
    // If no text found, fallback to alt text
    if (parts.length === 0 && img && img.alt) {
      parts.push(img.alt.trim());
    }
    textContent = parts.join(' ');
    // If still no text, use alt text as fallback
    if (!textContent && img && img.alt) {
      textContent = img.alt.trim();
    }
    // If still no text, use empty string
    return [img, textContent];
  });

  // Compose the table data: header + card rows
  const tableData = [headerRow, ...rows];

  // Create the block table using DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
