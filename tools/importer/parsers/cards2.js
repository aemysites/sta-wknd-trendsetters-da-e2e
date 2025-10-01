/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor/div
  function extractCard(cardEl) {
    // Find the image (mandatory)
    let img = cardEl.querySelector('img');
    // Defensive: if image is wrapped in a div, get the div
    let imgContainer = img ? img.closest('div') : null;
    if (!imgContainer) imgContainer = img;

    // Find heading (h2, h3, h4, h5, h6)
    let heading = cardEl.querySelector('h2, h3, h4, h5, h6');
    // Find paragraph (description)
    let desc = cardEl.querySelector('p');
    // Find CTA (button or link or div.button)
    let cta = cardEl.querySelector('a.button, button, .button');
    // If CTA is a div, wrap it in a <p> for semantic purposes
    if (cta && cta.tagName === 'DIV') {
      const p = document.createElement('p');
      p.appendChild(cta);
      cta = p;
    }

    // Compose text cell: heading, desc, cta (if present)
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);

    return [imgContainer, textCell];
  }

  // Find the grid containing the cards
  const container = element.querySelector('.grid-layout');
  if (!container) return;

  // The first card is a large card (with nested .utility-padding-all-2rem)
  const cards = [];
  const children = Array.from(container.children);
  // First card is a direct <a>
  if (children[0].tagName === 'A') {
    cards.push(children[0]);
  }
  // Second child is a nested grid containing the rest of the cards
  const nestedGrid = children.find(
    (child) => child.classList && child.classList.contains('grid-layout')
  );
  if (nestedGrid) {
    Array.from(nestedGrid.children).forEach((el) => {
      // Only process anchors (cards)
      if (el.tagName === 'A') cards.push(el);
    });
  }

  // Build table rows
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];
  cards.forEach((card) => {
    rows.push(extractCard(card));
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
