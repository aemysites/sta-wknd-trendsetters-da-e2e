/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards24) block: 2 columns, first row is header, each subsequent row is a card (image, text)
  const rows = [];
  // Header row
  rows.push(['Cards (cards24)']);

  // Find all card containers (supporting multiple cards if present)
  const cardBodies = element.querySelectorAll('.card-body');
  cardBodies.forEach(cardBody => {
    // Get the image (mandatory, first cell)
    const img = cardBody.querySelector('img');
    // Get the heading (optional, second cell)
    const heading = cardBody.querySelector('.h4-heading');
    // Build the text cell content ONLY from HTML
    const textCell = [];
    if (heading) {
      const headingDiv = document.createElement('div');
      headingDiv.appendChild(document.createTextNode(heading.textContent.trim()));
      headingDiv.style.fontWeight = 'bold';
      textCell.push(headingDiv);
    }
    // Add any other text nodes directly under cardBody (excluding heading and img)
    cardBody.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textCell.push(document.createTextNode(node.textContent.trim()));
      }
      if (node.nodeType === Node.ELEMENT_NODE && node !== heading && node.tagName !== 'IMG') {
        if (node.textContent.trim()) {
          textCell.push(document.createTextNode(node.textContent.trim()));
        }
      }
    });
    // DO NOT add screenshot overlay text
    rows.push([
      img || '',
      textCell.length > 0 ? textCell : ''
    ]);
  });

  // Only create table if there is at least one card
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
