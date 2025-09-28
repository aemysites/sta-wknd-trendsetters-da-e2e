/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block header, exactly one column
  const headerRow = ['Cards (cards35)'];

  // Get all immediate child divs (each card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  // For each card, extract the image (first child img) and all text content inside the card div
  const rows = Array.from(cardDivs).map((cardDiv) => {
    const img = cardDiv.querySelector('img');
    // Collect all text nodes and elements except the image
    let textContent = '';
    Array.from(cardDiv.childNodes).forEach((node) => {
      if (node !== img && node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent.trim() + ' ';
      } else if (node !== img && node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'IMG') {
        textContent += node.textContent.trim() + ' ';
      }
    });
    textContent = textContent.trim();
    // If no text found, fallback to alt text
    if (!textContent && img) {
      textContent = img.getAttribute('alt') || '';
    }
    // Ensure all text content is included
    const textCell = document.createTextNode(textContent);
    return img ? [img, textCell] : null;
  }).filter(Boolean);

  // Build the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
