/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content (image, heading, description, CTA)
  function extractCard(cardEl) {
    // Image: find first <img> inside card
    const img = cardEl.querySelector('img');

    // Heading: find first h2, h3, or h4 inside card
    let heading = cardEl.querySelector('h2, h3, h4');

    // Description: find first <p> after heading, or first <p> if no heading
    let description = null;
    if (heading) {
      description = heading.nextElementSibling && heading.nextElementSibling.tagName.toLowerCase() === 'p'
        ? heading.nextElementSibling : null;
    }
    if (!description) {
      description = cardEl.querySelector('p');
    }

    // CTA: look for .button or a.button or a with button-like text
    let cta = cardEl.querySelector('.button, a.button');
    if (!cta) {
      // Sometimes the button is just a <div class="button">
      cta = Array.from(cardEl.querySelectorAll('a')).find(a => /read more|learn more|shop now|explore/i.test(a.textContent));
    }
    // If cta is a <div>, convert it to an <a> for semantic correctness
    if (cta && cta.tagName.toLowerCase() === 'div') {
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = cta.textContent;
      a.className = cta.className;
      cta = a;
    }

    // Compose text cell contents
    const textContent = [];
    if (heading) textContent.push(heading);
    if (description) textContent.push(description);
    if (cta) textContent.push(cta);

    return [img, textContent];
  }

  // Find the main grid containing all cards
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // The first card is a feature card (direct child <a>), the rest are inside a nested grid
  const cards = [];
  const children = Array.from(mainGrid.children);
  // First card is a direct <a>
  if (children[0].tagName.toLowerCase() === 'a') {
    cards.push(children[0]);
  }
  // The next element is the nested grid containing the rest of the cards
  const nestedGrid = children.find(el => el.classList.contains('w-layout-grid'));
  if (nestedGrid) {
    Array.from(nestedGrid.children).forEach(child => {
      if (child.tagName.toLowerCase() === 'a') {
        cards.push(child);
      }
    });
  }

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards2)']);
  // Card rows
  cards.forEach(cardEl => {
    rows.push(extractCard(cardEl));
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
