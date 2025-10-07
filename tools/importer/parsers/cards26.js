/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards26) block: extract each card's image and text content
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  // Helper to extract image and text content from a card
  function extractCard(card) {
    // Find the main image (always present)
    const img = card.querySelector('img');
    // Find the text container (may be missing for pure image cards)
    let textContent = '';
    const rel = card.querySelector('.utility-position-relative');
    if (rel) {
      // Get heading and paragraph if present
      const h3 = rel.querySelector('h3');
      const p = rel.querySelector('p');
      const blocks = [];
      if (h3) blocks.push(h3);
      if (p) blocks.push(p);
      textContent = blocks.length ? blocks : rel;
    } else {
      // If no text in this card, leave cell empty (do NOT use alt text)
      textContent = '';
    }
    return [img, textContent];
  }

  // Only include cards with BOTH image and text content
  const cardDivs = Array.from(element.children);
  cardDivs.forEach((card) => {
    const img = card.querySelector('img');
    const rel = card.querySelector('.utility-position-relative');
    // Only add cards with both image and text
    if (img && rel) {
      const [imageEl, textEl] = extractCard(card);
      rows.push([imageEl, textEl]);
    }
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
