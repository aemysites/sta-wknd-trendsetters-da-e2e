/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required by block spec
  const headerRow = ['Cards (cards36)']; // exactly one column

  // Get all immediate child divs (each is a card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build card rows
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    if (!img) return null;

    // Try to find any text content in the cardDiv (including alt text)
    let textContent = '';
    cardDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent.trim() + ' ';
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'IMG' && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
        textContent += node.textContent.trim() + ' ';
      }
    });
    textContent = textContent.trim();
    if (!textContent && img.alt) {
      textContent = img.alt.trim();
    }
    if (!textContent) {
      textContent = ' ';
    }

    return [img, textContent];
  }).filter(Boolean);

  // Compose table cells
  const cells = [headerRow, ...rows];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix header row colspan to match two columns
  const thead = table.querySelector('thead');
  if (thead) {
    const th = thead.querySelector('th');
    if (th) th.setAttribute('colspan', '2');
  }

  // Replace original element
  element.replaceWith(table);
}
