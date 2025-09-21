/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from a card anchor
  function getCardImage(card) {
    // Prefer first img inside card
    const img = card.querySelector('img');
    return img || null;
  }

  // Helper to extract text content from a card anchor
  function getCardText(card) {
    const frag = document.createDocumentFragment();
    // Try to get heading
    let heading = card.querySelector('h2, h3, h4, h5, h6');
    if (heading) frag.appendChild(heading);
    // Try to get description (first <p> after heading)
    let paragraphs = card.querySelectorAll('p');
    paragraphs.forEach(p => frag.appendChild(p));
    // Try to get CTA (button or link inside card)
    let cta = card.querySelector('.button, button, a:not([class*="utility-link-content-block"])');
    if (cta) frag.appendChild(cta);
    return frag;
  }

  // Find main cards container (the grid)
  const grid = element.querySelector('.grid-layout');
  // Defensive: if not found, fallback to element
  const cardsParent = grid || element;

  // Find all card anchors (each card is an <a> or direct child)
  // There is a nested grid for the first card, so we need to flatten
  let cards = [];
  // Top-level cards
  cards = Array.from(cardsParent.children).flatMap(child => {
    if (child.matches('a.utility-link-content-block')) {
      return [child];
    }
    // Nested grid (for secondary cards)
    if (child.classList.contains('grid-layout')) {
      return Array.from(child.children).filter(c => c.matches('a.utility-link-content-block'));
    }
    return [];
  });

  // Build table rows
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  cards.forEach(card => {
    const img = getCardImage(card);
    const text = getCardText(card);
    // Only add row if image and text exist
    if (img && text) {
      rows.push([img, text]);
    }
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
