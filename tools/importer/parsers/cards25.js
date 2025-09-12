/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a grid child
  function extractCardContent(cardEl) {
    // Find the image (always present)
    const img = cardEl.querySelector('img');
    // Defensive: if no image, skip this card
    if (!img) return null;

    // Find the text content (title/desc)
    let textContent = null;
    // Look for a container with padding (holds h3/p)
    const pad = cardEl.querySelector('.utility-padding-all-2rem');
    if (pad) {
      // Use all children (h3, p, etc) as a fragment
      const frag = document.createDocumentFragment();
      Array.from(pad.children).forEach(child => frag.appendChild(child));
      textContent = frag;
    } else {
      // If no text, leave cell empty
      textContent = '';
    }
    return [img, textContent];
  }

  // Get all direct children of the grid
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [];

  cards.forEach(cardEl => {
    // Only process cards that have an image
    const img = cardEl.querySelector('img');
    if (!img) return;
    // If card has text (h3/p), use it; else, leave cell blank
    let textCell = '';
    const pad = cardEl.querySelector('.utility-padding-all-2rem');
    if (pad) {
      const frag = document.createDocumentFragment();
      Array.from(pad.children).forEach(child => frag.appendChild(child));
      textCell = frag;
    }
    rows.push([img, textCell]);
  });

  // Table header
  const headerRow = ['Cards (cards25)'];
  const cells = [headerRow, ...rows];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
