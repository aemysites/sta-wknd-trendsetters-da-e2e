/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from a card block
  function extractImage(card) {
    const img = card.querySelector('img');
    return img || null;
  }

  // Helper to extract tag group (optional)
  function extractTag(card) {
    const tagGroup = card.querySelector('.tag-group');
    if (tagGroup) {
      const tags = Array.from(tagGroup.querySelectorAll('.tag'));
      if (tags.length > 0) {
        const tagDiv = document.createElement('div');
        tagDiv.className = 'tags';
        tags.forEach(tag => tagDiv.appendChild(tag.cloneNode(true)));
        return tagDiv;
      }
    }
    return null;
  }

  function extractHeading(card) {
    const h3 = card.querySelector('h3, .h2-heading, .h4-heading');
    if (h3) return h3.cloneNode(true);
    return null;
  }

  function extractDescription(card) {
    const p = card.querySelector('p');
    if (p) return p.cloneNode(true);
    return null;
  }

  function buildTextCell(card) {
    const parts = [];
    const tag = extractTag(card);
    if (tag) parts.push(tag);
    const heading = extractHeading(card);
    if (heading) parts.push(heading);
    const desc = extractDescription(card);
    if (desc) parts.push(desc);
    // Also include any additional text nodes or elements not covered
    // For flexibility, include all direct children except image
    Array.from(card.childNodes).forEach(node => {
      if (
        node.nodeType === 3 && node.textContent.trim() !== ''
      ) {
        // Text node
        const span = document.createElement('span');
        span.textContent = node.textContent.trim();
        parts.push(span);
      } else if (
        node.nodeType === 1 &&
        node.tagName !== 'IMG' &&
        node.tagName !== 'DIV' &&
        node.tagName !== 'H3' &&
        node.tagName !== 'P'
      ) {
        parts.push(node.cloneNode(true));
      }
    });
    return parts;
  }

  // Get all card blocks
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Use only valid selectors for children
  const gridChildren = Array.from(grid.children);

  let cards = [];
  if (gridChildren.length > 0) {
    // First main card
    if (gridChildren[0].tagName === 'A') {
      cards.push(gridChildren[0]);
    }
    // Next two groups are flex containers with a's inside
    for (let i = 1; i < gridChildren.length; i++) {
      const group = gridChildren[i];
      if (group.querySelectorAll) {
        const groupCards = Array.from(group.querySelectorAll('a'));
        cards = cards.concat(groupCards);
      }
    }
  }

  // Build table rows
  const rows = [];
  const headerRow = ['Cards (cards37)'];
  rows.push(headerRow);

  cards.forEach(card => {
    const img = extractImage(card);
    const textCell = buildTextCell(card);
    // If no image, try to find image in previous sibling or child
    let imageCell = img;
    if (!imageCell) {
      // Try to find image in child divs
      const possibleImg = card.querySelector('img');
      if (possibleImg) imageCell = possibleImg;
    }
    // If still no image, skip this card (mandatory)
    if (!imageCell) return;
    // Ensure textCell has content
    if (!textCell || textCell.length === 0) return;
    rows.push([
      imageCell,
      textCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
