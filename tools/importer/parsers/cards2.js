/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from a card block
  function getImage(card) {
    // Look for an img tag inside the card
    const img = card.querySelector('img');
    return img || '';
  }

  // Helper to extract text content from a card block
  function getTextContent(card) {
    // We'll collect tag, heading, and paragraph (if present)
    const fragments = [];
    // Tag (optional)
    const tagGroup = card.querySelector('.tag-group');
    if (tagGroup) {
      // Use the actual tag element for semantic import
      fragments.push(tagGroup);
    }
    // Heading (h3 or h4)
    const heading = card.querySelector('h3, .h2-heading, .h4-heading');
    if (heading) {
      fragments.push(heading);
    }
    // Paragraph
    const para = card.querySelector('p');
    if (para) {
      fragments.push(para);
    }
    return fragments;
  }

  // Get the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Prepare the header row
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  // --- First card (large, left) ---
  // It's an <a> block, first child of grid
  const firstCard = grid.children[0];
  if (firstCard && firstCard.tagName === 'A') {
    const img = getImage(firstCard);
    const text = getTextContent(firstCard);
    rows.push([img, text]);
  }

  // --- Next two cards (top right) ---
  // They are inside a .flex-horizontal.flex-vertical.flex-gap-sm div
  const rightTopCardsContainer = grid.children[1];
  if (rightTopCardsContainer) {
    const rightTopCards = rightTopCardsContainer.querySelectorAll('a.utility-link-content-block');
    rightTopCards.forEach(card => {
      const img = getImage(card);
      const text = getTextContent(card);
      rows.push([img, text]);
    });
  }

  // --- Remaining cards (vertical list, right) ---
  // They are inside another .flex-horizontal.flex-vertical.flex-gap-sm div
  const rightBottomCardsContainer = grid.children[2];
  if (rightBottomCardsContainer) {
    const rightBottomCards = rightBottomCardsContainer.querySelectorAll('a.utility-link-content-block');
    rightBottomCards.forEach(card => {
      // These cards have no image, so first cell is empty string
      const text = getTextContent(card);
      rows.push(['', text]);
    });
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
