/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards19)'];

  // Get all immediate card children (each card is a direct child div)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build rows for each card
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the icon/image (first .icon img inside)
    let iconImg = cardDiv.querySelector('.icon img');
    // Defensive: fallback to any img if not found
    if (!iconImg) {
      iconImg = cardDiv.querySelector('img');
    }
    // Defensive: if no img, fallback to .icon div itself
    let iconCell;
    if (iconImg) {
      iconCell = iconImg;
    } else {
      const iconDiv = cardDiv.querySelector('.icon');
      iconCell = iconDiv ? iconDiv : document.createTextNode('');
    }

    // Find the text content (the first p inside the card)
    const textP = cardDiv.querySelector('p');
    let textCell;
    if (textP) {
      textCell = textP;
    } else {
      // Defensive: fallback to all text content in cardDiv
      textCell = document.createTextNode(cardDiv.textContent.trim());
    }

    return [iconCell, textCell];
  });

  // Compose table data
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
