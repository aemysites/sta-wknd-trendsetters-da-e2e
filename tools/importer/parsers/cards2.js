/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text content from a card anchor
  function extractCardContent(cardEl) {
    // Find the image (mandatory)
    const img = cardEl.querySelector('img');
    // Find the heading (h3 or h4)
    let heading = cardEl.querySelector('h3, h4');
    // Find the description (first <p> after heading)
    let description = cardEl.querySelector('p');
    // Find CTA (button or link or .button)
    let cta = cardEl.querySelector('.button, a.button');
    // Compose text cell content
    const textContent = [];
    if (heading) textContent.push(heading);
    if (description) textContent.push(description);
    if (cta) textContent.push(cta);
    return [img, textContent];
  }

  // Find the main grid containing all cards
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Get all immediate children that are cards or nested grids
  const cardElements = [];
  // The first card is a direct <a>, the rest are inside a nested grid
  const children = Array.from(mainGrid.children);
  if (children.length > 0) {
    // First card
    const firstCard = children[0];
    if (firstCard.tagName === 'A') {
      cardElements.push(firstCard);
    }
    // Nested grid with more cards
    const nestedGrid = children.find(
      (el) => el.classList.contains('w-layout-grid') && el !== firstCard
    );
    if (nestedGrid) {
      Array.from(nestedGrid.children).forEach((el) => {
        if (el.tagName === 'A') {
          cardElements.push(el);
        }
      });
    }
  }

  // Build the table rows
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  cardElements.forEach((cardEl) => {
    rows.push(extractCardContent(cardEl));
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
