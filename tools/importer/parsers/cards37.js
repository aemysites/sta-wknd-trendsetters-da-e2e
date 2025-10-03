/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a link block
  function extractCard(linkEl) {
    // Find image (if any)
    const imgContainer = linkEl.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    let img = null;
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    // Find tag (if any)
    const tagGroup = linkEl.querySelector('.tag-group');
    let tag = null;
    if (tagGroup) {
      tag = tagGroup.querySelector('.tag');
    }
    // Find heading
    let heading = linkEl.querySelector('h3');
    // Find description
    let desc = linkEl.querySelector('p');
    // Compose text cell
    const textParts = [];
    if (tag) textParts.push(tag);
    if (heading) textParts.push(heading);
    if (desc) textParts.push(desc);
    // If no image, use empty string for first cell
    return [img || '', textParts];
  }

  // Find the main grid
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // First card (large)
  const firstCardLink = grid.querySelector('.utility-link-content-block');
  let firstCard = null;
  if (firstCardLink) {
    firstCard = extractCard(firstCardLink);
  }

  // Second row of cards (with images)
  const secondRow = grid.querySelector('.flex-horizontal.flex-vertical.flex-gap-sm');
  let secondRowCards = [];
  if (secondRow) {
    const links = secondRow.querySelectorAll('.utility-link-content-block');
    links.forEach((link) => {
      secondRowCards.push(extractCard(link));
    });
  }

  // Third row of cards (text only)
  const thirdRow = grid.querySelector('.flex-horizontal.flex-vertical.flex-gap-sm + .flex-horizontal.flex-vertical.flex-gap-sm');
  let thirdRowCards = [];
  // Defensive: If not found, get all direct children of grid after first two blocks
  let thirdRowBlock = null;
  if (!thirdRow) {
    const gridChildren = Array.from(grid.children);
    // The third block is after the first two
    thirdRowBlock = gridChildren.find((el, idx) => idx > 1 && el.classList.contains('flex-horizontal'));
  } else {
    thirdRowBlock = thirdRow;
  }
  if (thirdRowBlock) {
    const links = thirdRowBlock.querySelectorAll('.utility-link-content-block');
    links.forEach((link) => {
      // No image, just text
      const heading = link.querySelector('h3');
      const desc = link.querySelector('p');
      const textParts = [];
      if (heading) textParts.push(heading);
      if (desc) textParts.push(desc);
      thirdRowCards.push(['', textParts]); // Use empty string for no image
    });
  }

  // Compose table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards37)']);

  // First card
  if (firstCard) rows.push(firstCard);
  // Second row cards
  secondRowCards.forEach(card => rows.push(card));
  // Third row cards
  thirdRowCards.forEach(card => rows.push(card));

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace element
  element.replaceWith(table);
}
