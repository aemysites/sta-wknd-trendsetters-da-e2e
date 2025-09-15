/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid containing all cards
  const outerGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!outerGrid) return;

  // Helper to extract image from a card
  function getCardImage(card) {
    // Look for .utility-aspect-2x3 or .utility-aspect-1x1 inside card
    const aspect = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    if (aspect) {
      const img = aspect.querySelector('img');
      if (img) return img;
    }
    return null;
  }

  // Helper to extract text content (heading, paragraph, button) from a card
  function getCardText(card) {
    const textContent = [];
    // Heading
    const heading = card.querySelector('h2, h3, h4');
    if (heading) textContent.push(heading);
    // Paragraph
    const paragraph = card.querySelector('p');
    if (paragraph) textContent.push(paragraph);
    // Button/CTA
    const button = card.querySelector('.button');
    if (button) textContent.push(button);
    return textContent;
  }

  // Cards can be direct children or nested in another grid
  let cardNodes = Array.from(outerGrid.children).filter((child) => {
    // Accept <a> elements with .utility-link-content-block
    return child.matches('a.utility-link-content-block');
  });

  // If there is a nested grid, get its cards too
  const nestedGrid = outerGrid.querySelector('.w-layout-grid.grid-layout');
  if (nestedGrid) {
    const nestedCards = Array.from(nestedGrid.children).filter((child) => {
      return child.matches('a.utility-link-content-block');
    });
    cardNodes = cardNodes.concat(nestedCards);
  }

  // Table header
  const headerRow = ['Cards (cards37)'];
  const rows = [headerRow];

  // For each card, build a row: [image, text content]
  cardNodes.forEach((card) => {
    const img = getCardImage(card);
    const textContent = getCardText(card);
    // Defensive: Only add if image and text
    if (img && textContent.length) {
      rows.push([img, textContent]);
    }
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
