/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cardsNoImages19)'];

  // Get all immediate card elements (each card is a direct child div)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each card row: only the text content (ignore icons)
  const rows = cardDivs.map(cardDiv => {
    // Defensive: find the <p> inside the card div
    const p = cardDiv.querySelector('p');
    // If not found, fallback to all text nodes
    let cellContent;
    if (p) {
      cellContent = p;
    } else {
      // fallback: collect all text nodes
      cellContent = document.createElement('div');
      cellContent.textContent = cardDiv.textContent.trim();
    }
    return [cellContent];
  });

  // Compose table data
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
