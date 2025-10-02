/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as per instructions
  const headerRow = ['Cards (cards36)'];

  // Get all immediate child divs (each is a card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Prepare card rows
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    // Use the entire cardDiv's text content, excluding the image's alt (which is already in the image)
    let text = '';
    // Get all text content from the cardDiv except from <img> elements
    cardDiv.querySelectorAll('img').forEach(i => i.remove());
    text = cardDiv.textContent.trim();
    // If no text content, fallback to alt text
    if (!text) {
      text = img.alt && img.alt.trim() ? img.alt.trim() : '';
    }
    // Only include cards with non-empty text content
    if (!text) return null;
    return [img, text];
  }).filter(Boolean); // Remove any nulls

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(block);
}
