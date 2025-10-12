/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from anchor blocks
  function extractCardContent(cardEl) {
    // Find image (first image descendant)
    const imgWrapper = cardEl.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    let img = null;
    if (imgWrapper) {
      img = imgWrapper.querySelector('img');
    }
    // Tag (category)
    const tagGroup = cardEl.querySelector('.tag-group');
    let tag = null;
    if (tagGroup) {
      tag = tagGroup.querySelector('.tag');
    }
    // Heading
    let heading = cardEl.querySelector('h3');
    // Description
    let desc = cardEl.querySelector('p');
    // Compose text cell
    const textCell = [];
    if (tag) textCell.push(tag);
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    // Return [image, text] (image can be null)
    return [img, textCell];
  }

  // Find the cards grid
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Gather all card rows
  const rows = [['Cards (cards37)']]; // header

  // --- First Card (large left card) ---
  const firstCard = grid.children[0];
  if (firstCard && firstCard.matches('a.utility-link-content-block')) {
    rows.push(extractCardContent(firstCard));
  }

  // --- Second Row: two cards with images (right column, top) ---
  const rightTopCardsContainer = grid.querySelector('.flex-horizontal.flex-vertical.flex-gap-sm');
  if (rightTopCardsContainer) {
    const rightTopCards = Array.from(rightTopCardsContainer.children).filter(el => el.matches('a.utility-link-content-block'));
    rightTopCards.forEach(cardEl => {
      rows.push(extractCardContent(cardEl));
    });
  }

  // --- Third Row: text-only cards (right column, bottom) ---
  const flexContainers = grid.querySelectorAll('.flex-horizontal.flex-vertical.flex-gap-sm');
  if (flexContainers.length > 1) {
    const rightBottomCardsContainer = flexContainers[1];
    const rightBottomCards = Array.from(rightBottomCardsContainer.children).filter(el => el.matches('a.utility-link-content-block'));
    rightBottomCards.forEach(cardEl => {
      // For text-only cards, no image: use empty string instead of null and do NOT add divider rows
      const textCell = [];
      let heading = cardEl.querySelector('h3');
      let desc = cardEl.querySelector('p');
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      rows.push(['', textCell]);
    });
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
