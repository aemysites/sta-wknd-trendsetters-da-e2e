/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Cards (cards36)'];

  // Find the grid container that holds all cards
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Helper to extract card content from an anchor card
  function extractCardContent(card) {
    // Find image (optional)
    const imgContainer = card.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    let img = imgContainer ? imgContainer.querySelector('img') : undefined;

    // Tag (optional)
    const tag = card.querySelector('.tag-group .tag');

    // Heading (h3 or h4)
    const heading = card.querySelector('h3');

    // Description
    const desc = card.querySelector('p');

    // Compose text cell
    const textCell = document.createElement('div');
    if (tag) {
      textCell.appendChild(tag.cloneNode(true));
    }
    if (heading) {
      textCell.appendChild(heading.cloneNode(true));
    }
    if (desc) {
      textCell.appendChild(desc.cloneNode(true));
    }

    // If no image, use empty cell
    return [img ? img : '', textCell];
  }

  // --- Collect all card rows ---
  const rows = [headerRow];

  // 1. Large feature card (left)
  const featureCard = grid.querySelector('a.utility-link-content-block');
  if (featureCard) {
    rows.push(extractCardContent(featureCard));
  }

  // 2. All other cards (right column and any additional)
  // Find all anchor cards inside grid, including nested flex containers
  const allCards = Array.from(grid.querySelectorAll('a.utility-link-content-block'));
  // Remove the feature card (already added)
  const otherCards = allCards.filter(card => card !== featureCard);
  otherCards.forEach(card => {
    rows.push(extractCardContent(card));
  });

  // Build the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}
