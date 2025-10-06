/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Get all direct card elements (each card is a direct child div)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Find the icon/image element (first .icon img inside)
    let iconImg = null;
    const iconDiv = cardDiv.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }
    // Defensive: fallback if not found
    if (!iconImg) {
      // If no icon, try to find any img
      iconImg = cardDiv.querySelector('img');
    }

    // Find the text content (first <p> inside)
    let textContent = null;
    const p = cardDiv.querySelector('p');
    if (p) {
      textContent = p;
    }
    // Defensive: fallback if not found
    if (!textContent) {
      // Try to find any text node
      textContent = document.createElement('span');
      textContent.textContent = cardDiv.textContent.trim();
    }

    // Compose the row: [icon/image, text content]
    rows.push([
      iconImg ? iconImg : '',
      textContent
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
