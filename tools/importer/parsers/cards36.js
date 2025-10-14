/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content (image, tag, heading, description)
  function extractCardContent(cardEl) {
    // Image: find the first img inside the card
    const img = cardEl.querySelector('img');
    // Text content: tag, heading, description
    const textContent = document.createElement('div');
    // Tag (optional)
    const tag = cardEl.querySelector('.tag');
    if (tag) {
      textContent.appendChild(tag.cloneNode(true));
    }
    // Heading (h2, h3, h4)
    const heading = cardEl.querySelector('h2, h3, h4');
    if (heading) {
      textContent.appendChild(heading.cloneNode(true));
    }
    // Description (first p)
    const desc = cardEl.querySelector('p');
    if (desc) {
      textContent.appendChild(desc.cloneNode(true));
    }
    return [img ? img : '', textContent.childNodes.length ? textContent : ''];
  }

  // Find the main grid container
  const container = element.querySelector('.grid-layout');
  if (!container) return;

  // Get all direct children of the grid container
  const children = Array.from(container.children);

  // First card (large, left)
  const firstCard = children.find(child => child.matches('a.utility-link-content-block'));

  // Next two cards with images (right, top)
  const flexRows = children.filter(child => child.matches('.flex-horizontal'));
  const secondThirdCards = flexRows[0]
    ? Array.from(flexRows[0].querySelectorAll('a.utility-link-content-block'))
    : [];

  // Remaining cards (text only, right, bottom)
  const textOnlyCards = flexRows[1]
    ? Array.from(flexRows[1].querySelectorAll('a.utility-link-content-block'))
    : [];

  // Compose table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards36)']);

  // First card (large, left)
  if (firstCard) {
    rows.push(extractCardContent(firstCard));
  }

  // Next two cards (with images)
  secondThirdCards.forEach(card => {
    rows.push(extractCardContent(card));
  });

  // Remaining text-only cards
  textOnlyCards.forEach(card => {
    // No image, just text content
    const textContent = document.createElement('div');
    // Heading
    const heading = card.querySelector('h2, h3, h4');
    if (heading) {
      textContent.appendChild(heading.cloneNode(true));
    }
    // Description
    const desc = card.querySelector('p');
    if (desc) {
      textContent.appendChild(desc.cloneNode(true));
    }
    rows.push(['', textContent.childNodes.length ? textContent : '']);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
