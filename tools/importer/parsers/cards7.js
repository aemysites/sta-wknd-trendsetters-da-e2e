/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly one column, block name only
  const headerRow = ['Cards (cards7)'];

  // Get all immediate child divs (each is a card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Prepare rows for each card
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // The alt text is the only possible text content for the card
    const alt = img.getAttribute('alt') || '';
    // Use alt as the title in the second cell if present, else empty string
    // Use a heading element as required by block spec
    let textCell = '';
    if (alt) {
      const h = document.createElement('h3');
      h.textContent = alt;
      textCell = h;
    }
    return [img, textCell];
  }).filter(Boolean);

  // Compose the table cells array
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
