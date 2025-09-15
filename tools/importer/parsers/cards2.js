/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  // Defensive: find the main grid containing all cards
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Helper to extract image (first img in a block)
  function getImage(block) {
    const img = block.querySelector('img');
    return img || null;
  }

  // Helper to extract text content (tag, heading, description)
  function getTextContent(block) {
    const parts = [];
    const tagGroup = block.querySelector('.tag-group');
    if (tagGroup) {
      parts.push(tagGroup);
    }
    const heading = block.querySelector('h2, h3, h4');
    if (heading) {
      parts.push(heading);
    }
    const para = block.querySelector('p');
    if (para) {
      parts.push(para);
    }
    return parts;
  }

  // --- First card (large, left) ---
  const firstCard = gridChildren[0]; // <a>
  if (firstCard && firstCard.tagName === 'A') {
    const img = getImage(firstCard);
    const text = getTextContent(firstCard);
    rows.push([
      img,
      text
    ]);
  }

  // --- Second block: two cards with images (right, stacked) ---
  const secondBlock = gridChildren[1]; // <div>
  if (secondBlock) {
    // Find all card links inside this block
    const cards = Array.from(secondBlock.querySelectorAll('a.utility-link-content-block'));
    cards.forEach(card => {
      const img = getImage(card);
      const text = getTextContent(card);
      rows.push([
        img,
        text
      ]);
    });
  }

  // --- Third block: vertical list of text-only cards ---
  const thirdBlock = gridChildren[2]; // <div>
  if (thirdBlock) {
    // Find all card links inside this block
    const cards = Array.from(thirdBlock.querySelectorAll('a.utility-link-content-block'));
    cards.forEach(card => {
      // No image, only text
      const text = getTextContent(card);
      rows.push([
        '', // No image
        text
      ]);
    });
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
