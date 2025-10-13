/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel (carousel24) block: 2 columns, first row is header, each slide is one row

  // Helper to get the card body (where the content is)
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Extract image (mandatory, first cell)
  const img = cardBody.querySelector('img');
  const imgCell = img || '';

  // Extract heading and any other visible text (e.g. 'PARTY NIGHTS TREND ON')
  const heading = cardBody.querySelector('.h4-heading');
  const textCell = [];
  if (heading) {
    const h2 = document.createElement('h2');
    h2.innerHTML = heading.innerHTML;
    textCell.push(h2);
  }

  // Find any additional visible text nodes inside cardBody (not inside .h4-heading)
  // This will catch things like 'PARTY NIGHTS TREND ON' if present
  Array.from(cardBody.childNodes).forEach((node) => {
    if (
      node.nodeType === Node.TEXT_NODE && node.textContent.trim() &&
      (!heading || !heading.contains(node))
    ) {
      textCell.push(node.textContent.trim());
    }
    // Also check for elements that might contain visible text
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      node !== heading &&
      node.tagName !== 'IMG'
    ) {
      const txt = node.textContent.trim();
      if (txt) {
        textCell.push(txt);
      }
    }
  });

  const headerRow = ['Carousel (carousel24)'];
  const slideRow = [imgCell, textCell];
  const rows = [headerRow, slideRow];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
