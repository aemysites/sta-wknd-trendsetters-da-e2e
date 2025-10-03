/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cards36)'];

  // Get all direct card divs
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each card, extract the image (mandatory) and all text content from the card div
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (!img) return null; // Defensive: skip if no image
    // Collect all text content from the card div (not just alt)
    let textContent = '';
    cardDiv.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent.trim() + ' ';
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'IMG') {
        textContent += node.textContent.trim() + ' ';
      }
    });
    textContent = textContent.trim() || img.getAttribute('alt') || '';
    return [img, textContent];
  }).filter(Boolean);

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create the Cards block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Ensure the header row is a single column (no colspan)
  const headerTr = blockTable.querySelector('tr');
  if (headerTr && headerTr.children.length === 1) {
    headerTr.children[0].removeAttribute('colspan');
  }

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
