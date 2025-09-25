/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.querySelectorAll) return;

  // Table header row as required
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Select all direct card divs
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Find the icon image (mandatory)
    let iconImg = null;
    const iconDiv = cardDiv.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }
    if (!iconImg) return; // skip if no icon

    // Find all text content (not just the first paragraph)
    // Gather all elements except the icon container
    const textNodes = [];
    cardDiv.childNodes.forEach((node) => {
      if (node.nodeType === 1 && !node.classList.contains('icon')) {
        textNodes.push(node);
      }
    });
    // If nothing found, fallback to all <p>
    if (textNodes.length === 0) {
      cardDiv.querySelectorAll('p').forEach(p => textNodes.push(p));
    }
    if (textNodes.length === 0) return; // skip if no text

    // Create a wrapper div for all text content
    const textWrapper = document.createElement('div');
    textNodes.forEach(node => textWrapper.appendChild(node.cloneNode(true)));

    rows.push([
      iconImg,
      textWrapper
    ]);
  });

  // Create the Cards block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
