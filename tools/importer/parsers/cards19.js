/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block parsing
  const headerRow = ['Cards (cards19)'];

  // Find all direct card elements (each card is a direct child div)
  const cardDivs = Array.from(element.children);

  // Build rows: each row is [icon/image, all text content]
  const rows = cardDivs.map(card => {
    // Find the icon image (SVG img) inside the card
    const iconImg = card.querySelector('.icon img');
    const image = iconImg || card.querySelector('img');

    // Get all text content from the card (not just <p>)
    // This ensures flexibility and captures all text
    let textContent = '';
    // Collect all text from all elements except the icon
    Array.from(card.children).forEach(child => {
      // Skip icon container
      if (!child.classList.contains('icon')) {
        textContent += child.textContent.trim() + ' ';
      }
    });
    textContent = textContent.trim();
    // If no text found, fallback to card.textContent (defensive)
    if (!textContent) {
      textContent = card.textContent.trim();
    }

    // Compose row: [image/icon, text]
    return [image, textContent];
  });

  // Compose table cells
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
