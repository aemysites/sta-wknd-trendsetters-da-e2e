/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row: exactly one column, per guidelines
  const headerRow = ['Cards (cards35)'];

  // Get all immediate child divs (each is a card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build card rows
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the image inside each card div
    const img = cardDiv.querySelector('img');
    if (!img) return null;

    // Use the alt text as the card's text content in the second cell
    const textCell = img.alt ? img.alt : '';
    return [img, textCell];
  }).filter(Boolean); // Remove any nulls

  // Compose table cells: header + card rows
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
