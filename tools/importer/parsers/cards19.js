/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block parsing
  // 1. Header row
  const headerRow = ['Cards (cards19)'];

  // 2. Find all card containers (each direct child div of the grid)
  const cardDivs = Array.from(element.children).filter(
    (child) => child.tagName === 'DIV'
  );

  // 3. Build rows: each card gets [icon/image, text]
  const rows = cardDivs.map((card) => {
    // Find icon/image
    let iconImg = null;
    // Find the first img inside .icon (SVG icons)
    const iconDiv = card.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }
    // Defensive: if not found, fallback to any img
    if (!iconImg) {
      iconImg = card.querySelector('img');
    }

    // Find text content: get all text nodes in the card except for icon
    // Remove the icon div from a clone, then get all text
    const cardClone = card.cloneNode(true);
    const iconDivClone = cardClone.querySelector('.icon');
    if (iconDivClone) {
      iconDivClone.remove();
    }
    // Get all text content, preserving line breaks if multiple paragraphs
    let textCell;
    const paragraphs = Array.from(cardClone.querySelectorAll('p'));
    if (paragraphs.length > 0) {
      // If there are paragraphs, put them in a div
      textCell = document.createElement('div');
      paragraphs.forEach(p => textCell.appendChild(p.cloneNode(true)));
    } else {
      // If no paragraphs, just use the remaining text
      textCell = document.createElement('div');
      textCell.textContent = cardClone.textContent.trim();
    }

    // Compose row: icon/image in first cell, text in second
    return [iconImg, textCell];
  });

  // 4. Compose table
  const tableCells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // 5. Replace original element
  element.replaceWith(blockTable);
}
