/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from a card
  function getCardImage(card) {
    return card.querySelector('img');
  }

  // Helper to extract all text content (including headings, paragraphs, and CTA)
  function getCardTextContent(card) {
    const content = [];
    // Collect all heading elements (h2-h6)
    const headings = card.querySelectorAll('h2, h3, h4, h5, h6');
    headings.forEach(h => content.push(h));
    // Collect all paragraphs
    const paragraphs = card.querySelectorAll('p');
    paragraphs.forEach(p => content.push(p));
    // Collect all CTAs (a.button, button, .button)
    // Only add if not already present in headings or paragraphs
    card.querySelectorAll('a.button, button, .button').forEach(btn => {
      // Avoid duplicates
      if (!content.includes(btn)) {
        // If CTA is a div with class 'button', wrap in a span for semantic grouping
        if (btn.tagName === 'DIV') {
          const span = document.createElement('span');
          span.appendChild(btn.cloneNode(true));
          content.push(span);
        } else {
          content.push(btn);
        }
      }
    });
    return content;
  }

  // Find the main grid containing the cards
  let cardsGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!cardsGrid) cardsGrid = element;

  // Find all card blocks (direct children that are .utility-link-content-block)
  const cardElements = Array.from(cardsGrid.querySelectorAll(':scope > a.utility-link-content-block, :scope > div.w-layout-grid > a.utility-link-content-block'));

  // Compose table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards37)']);

  // For each card, extract image and text content
  cardElements.forEach(card => {
    const img = getCardImage(card);
    const textContent = getCardTextContent(card);
    rows.push([
      img || '',
      textContent.length ? textContent : ''
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
