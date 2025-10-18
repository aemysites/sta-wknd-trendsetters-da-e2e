/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block parsing
  // 1. Header row
  const headerRow = ['Cards (cards19)'];

  // 2. Find all card items (each immediate child div is a card)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // 3. For each card, extract icon (img) and full text content (not just <p>)
  const rows = cardDivs.map(card => {
    // Find the icon image (first img inside .icon)
    const iconImg = card.querySelector('.icon img');
    // Defensive: fallback to any img if .icon img not found
    const img = iconImg || card.querySelector('img');
    // Extract all text content from the card, excluding the icon
    let textContent = '';
    // Remove the icon div to avoid extracting alt text or SVG code
    const cardClone = card.cloneNode(true);
    const iconDiv = cardClone.querySelector('.icon');
    if (iconDiv) iconDiv.remove();
    textContent = cardClone.textContent.trim();
    return [img, textContent];
  });

  // 4. Assemble table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // 5. Replace original element
  element.replaceWith(table);
}
