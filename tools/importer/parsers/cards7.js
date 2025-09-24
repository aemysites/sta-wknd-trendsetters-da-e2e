/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block requirements
  const headerRow = ['Cards (cards7)'];

  // Get all immediate children (each is a card container with an image)
  const cardDivs = element.querySelectorAll(':scope > div');

  if (!cardDivs.length) return;

  // For each card div, extract the image (first child img)
  // and all text content (not just alt)
  const rows = Array.from(cardDivs).map(cardDiv => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Gather all text content inside the cardDiv (including alt, but also any text nodes)
    let textContent = '';
    // Collect all text nodes (excluding script/style)
    cardDiv.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent.trim() + ' ';
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'IMG') {
        textContent += node.textContent.trim() + ' ';
      }
    });
    textContent = textContent.trim();
    // Always include the image alt text (for accessibility/title)
    const altText = img.getAttribute('alt') || '';
    // If the textContent doesn't include alt text, prepend it
    let cellContent;
    if (textContent && !textContent.includes(altText)) {
      const heading = document.createElement('strong');
      heading.textContent = altText;
      cellContent = [heading, document.createTextNode(' ' + textContent)];
    } else if (altText) {
      const heading = document.createElement('strong');
      heading.textContent = altText;
      cellContent = [heading];
    } else {
      cellContent = [document.createTextNode(textContent)];
    }
    return [img, cellContent];
  }).filter(Boolean);

  const tableData = [headerRow, ...rows];

  const block = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(block);
}
