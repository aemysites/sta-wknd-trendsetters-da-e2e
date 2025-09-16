/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from a card anchor
  function getCardImage(card) {
    return card.querySelector('img');
  }

  // Helper to extract text content from a card anchor
  function getCardText(card) {
    const textParts = [];
    // Tag (optional)
    const tag = card.querySelector('.tag-group');
    if (tag) textParts.push(tag);
    // Heading (h2 or h3 or h4)
    const heading = card.querySelector('h2, h3, h4');
    if (heading) textParts.push(heading);
    // Paragraph (optional)
    const para = card.querySelector('p');
    if (para) textParts.push(para);
    return textParts;
  }

  // Helper to extract text content from a text-only card (no image)
  function getTextOnlyCardContent(card) {
    const textParts = [];
    // Heading (h2/h3/h4)
    const heading = card.querySelector('h2, h3, h4');
    if (heading) textParts.push(heading);
    // Paragraph
    const para = card.querySelector('p');
    if (para) textParts.push(para);
    return textParts;
  }

  // Find the grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Cards array
  const rows = [];
  // Header row
  rows.push(['Cards (cards2)']);

  // Find the first main card (large image, left side)
  const firstCard = grid.querySelector('a.utility-link-content-block');
  if (firstCard) {
    const img = getCardImage(firstCard);
    const text = getCardText(firstCard);
    rows.push([
      img,
      text
    ]);
  }

  // Find the flex group with two image cards (right side, top)
  const flexGroups = grid.querySelectorAll('.flex-horizontal.flex-vertical.flex-gap-sm');
  if (flexGroups.length > 0) {
    // The first flex group contains two image cards
    const imageCards = flexGroups[0].querySelectorAll('a.utility-link-content-block');
    imageCards.forEach(card => {
      const img = getCardImage(card);
      const text = getCardText(card);
      rows.push([
        img,
        text
      ]);
    });
  }

  // The second flex group contains text-only cards separated by dividers
  if (flexGroups.length > 1) {
    // Select all card anchors inside the second flex group
    const textCards = flexGroups[1].querySelectorAll('a.utility-link-content-block');
    textCards.forEach(card => {
      const text = getTextOnlyCardContent(card);
      // Always push two columns: first is empty (no image), second is text
      rows.push([
        '',
        text
      ]);
    });
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
