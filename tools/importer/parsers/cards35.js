/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by block spec
  const headerRow = ['Cards (cards35)'];

  // Get all direct child divs (each is a card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build rows: each row is [image, text]
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find image in card
    const img = cardDiv.querySelector('img');
    // Defensive: only add if present
    const imageCell = img ? img : '';
    // Get all text content from cardDiv except image
    let textCell = '';
    // Remove image from cardDiv clone, then get text
    if (img) {
      const clone = cardDiv.cloneNode(true);
      const cloneImg = clone.querySelector('img');
      if (cloneImg) cloneImg.remove();
      textCell = clone.textContent.trim();
    } else {
      textCell = cardDiv.textContent.trim();
    }
    return [imageCell, textCell];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with block table
  element.replaceWith(block);
}
