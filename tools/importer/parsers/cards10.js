/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process if element exists
  if (!element) return;

  // Table header as required by block spec
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all direct child card links (each card is an <a>)
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach((card) => {
    // Defensive: Each card should have image and text container
    let imgEl = null;
    let textContent = document.createElement('div');

    // Find the image: look for first img inside card
    imgEl = card.querySelector('img.card-image');
    // Defensive: If not found, fallback to any img
    if (!imgEl) imgEl = card.querySelector('img');

    // Find the text container (utility-padding-all-1rem)
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    if (textContainer) {
      // Use the whole text container as the text cell
      textContent = textContainer;
    } else {
      // Fallback: gather all non-image content
      const fallbackDiv = document.createElement('div');
      Array.from(card.children).forEach((child) => {
        if (!child.querySelector('img')) fallbackDiv.appendChild(child.cloneNode(true));
      });
      textContent = fallbackDiv;
    }

    // Build the row: [image, textContent]
    // Use the actual element references, not clones
    rows.push([
      imgEl,
      textContent
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
