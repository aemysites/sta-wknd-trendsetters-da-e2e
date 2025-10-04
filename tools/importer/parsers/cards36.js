/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from an anchor card element
  function extractCard(cardEl) {
    // Find image (if any)
    let img = cardEl.querySelector('img');
    // Find tag (if any)
    let tag = cardEl.querySelector('.tag');
    // Find heading (h3 or h4)
    let heading = cardEl.querySelector('h3, h4');
    // Find description (paragraph)
    let desc = cardEl.querySelector('p');
    // Compose text cell content
    let textContent = [];
    if (tag) {
      textContent.push(tag);
    }
    if (heading) {
      textContent.push(heading);
    }
    if (desc) {
      textContent.push(desc);
    }
    // If no textContent, fallback to the whole cardEl
    if (textContent.length === 0) {
      textContent.push(cardEl);
    }
    return [img ? img : '', textContent];
  }

  // Get grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of grid
  const gridChildren = Array.from(grid.children);

  // First card (large left card)
  let firstCard = null;
  // Next two cards (top right)
  let secondCard = null;
  let thirdCard = null;
  // Remaining cards (vertical stack)
  let verticalCards = [];

  // Defensive: find the first anchor (the big card)
  firstCard = gridChildren.find((el) => el.tagName === 'A');
  // Defensive: find the first flex-horizontal (contains next two cards)
  const flex1 = gridChildren.find((el) => el.classList.contains('flex-horizontal'));
  // Defensive: find the second flex-horizontal (contains vertical cards)
  const flex2 = gridChildren.find((el, i) => el.classList.contains('flex-horizontal') && i !== gridChildren.indexOf(flex1));

  // Extract the two cards from flex1 (anchors)
  let flex1Cards = [];
  if (flex1) {
    flex1Cards = Array.from(flex1.querySelectorAll(':scope > a'));
  }
  // Extract the vertical cards from flex2 (anchors)
  if (flex2) {
    verticalCards = Array.from(flex2.querySelectorAll(':scope > a'));
  }

  // Compose all cards in order
  const cards = [];
  if (firstCard) cards.push(firstCard);
  if (flex1Cards.length) cards.push(...flex1Cards);
  if (verticalCards.length) cards.push(...verticalCards);

  // Build table rows
  const headerRow = ['Cards (cards36)'];
  const rows = [headerRow];
  cards.forEach((cardEl) => {
    rows.push(extractCard(cardEl));
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
