/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from a card anchor
  function extractImage(card) {
    // Look for an img inside a div (aspect ratio wrapper)
    const img = card.querySelector('img');
    return img || null;
  }

  // Helper to extract text content from a card anchor
  function extractTextContent(card) {
    // Find heading (h3 or h4)
    let heading = card.querySelector('h3, h4');
    // Find description (first <p> after heading)
    let desc = null;
    if (heading) {
      desc = heading.nextElementSibling && heading.nextElementSibling.tagName.toLowerCase() === 'p'
        ? heading.nextElementSibling
        : null;
    } else {
      // fallback: first <p>
      desc = card.querySelector('p');
    }
    // Find CTA (button or .button or link)
    let cta = card.querySelector('.button, button, a.button');
    // Compose content
    const content = [];
    if (heading) content.push(heading);
    if (desc) content.push(desc);
    if (cta) content.push(cta);
    return content;
  }

  // Find the main grid containing cards
  let grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  // The first card is sometimes a direct child, sometimes nested
  let cards = [];
  // If the first child is an anchor, it's a card
  const directCards = Array.from(grid.children).filter((el) => el.tagName.toLowerCase() === 'a');
  if (directCards.length > 0) {
    // First card is direct, rest are in the nested grid
    cards.push(directCards[0]);
    // Find the nested grid for the rest
    const nestedGrid = grid.querySelector('.w-layout-grid.grid-layout');
    if (nestedGrid) {
      cards = cards.concat(Array.from(nestedGrid.querySelectorAll('a.utility-link-content-block')));
    }
  } else {
    // All cards are in the nested grid
    cards = Array.from(grid.querySelectorAll('a.utility-link-content-block'));
  }

  // Defensive: filter only anchors with an image and a heading
  cards = cards.filter(card => card.querySelector('img') && card.querySelector('h3, h4'));

  // Build table rows
  const rows = [];
  // Header row
  const headerRow = ['Cards (cards2)'];
  rows.push(headerRow);

  // Card rows
  cards.forEach(card => {
    const img = extractImage(card);
    const textContent = extractTextContent(card);
    if (img && textContent.length) {
      rows.push([img, textContent]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
