/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card anchor
  function extractCardContent(cardAnchor) {
    const cells = [];
    // Image (first cell)
    let imageDiv = cardAnchor.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    let image = imageDiv ? imageDiv.querySelector('img') : null;
    // Tag (optional)
    let tagGroup = cardAnchor.querySelector('.tag-group');
    let tag = tagGroup ? tagGroup.querySelector('.tag') : null;
    // Heading (h3)
    let heading = cardAnchor.querySelector('h3');
    // Description (p)
    let desc = cardAnchor.querySelector('p');
    // Compose text cell
    const textParts = [];
    if (tag) textParts.push(tag);
    if (heading) textParts.push(heading);
    if (desc) textParts.push(desc);
    // First cell: image (if present)
    cells.push(image ? image : '');
    // Second cell: text content
    cells.push(textParts);
    return cells;
  }

  // Find the grid container holding the cards
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Cards array for table rows
  const cardRows = [];

  // Header row
  const headerRow = ['Cards (cards37)'];
  cardRows.push(headerRow);

  // --- First card (large, left) ---
  const firstCardAnchor = grid.querySelector('a.utility-link-content-block');
  if (firstCardAnchor) {
    cardRows.push(extractCardContent(firstCardAnchor));
  }

  // --- Next two image cards (top right) ---
  // These are inside the first .flex-horizontal container
  const flexContainers = grid.querySelectorAll('.flex-horizontal');
  if (flexContainers.length > 0) {
    const imageCards = flexContainers[0].querySelectorAll('a.utility-link-content-block');
    imageCards.forEach(cardAnchor => {
      cardRows.push(extractCardContent(cardAnchor));
    });
  }

  // --- Text-only cards (bottom right) ---
  // These are inside the second .flex-horizontal container
  if (flexContainers.length > 1) {
    const textCards = flexContainers[1].querySelectorAll('a.utility-link-content-block');
    textCards.forEach(cardAnchor => {
      // For text-only cards, no image
      let heading = cardAnchor.querySelector('h3');
      let desc = cardAnchor.querySelector('p');
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      cardRows.push(['', textCell]);
    });
  }

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cardRows, document);
  // Replace the original element
  element.replaceWith(block);
}
