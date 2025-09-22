/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image, title, and description from a card anchor
  function extractCardParts(card) {
    // Try to find an image (mandatory for this block)
    let img = card.querySelector('img');
    // Try to find a heading (title)
    let heading = card.querySelector('h3, h2, h4, h5, h6');
    // Try to find a description (paragraph or div with class containing 'paragraph')
    let desc = card.querySelector('.paragraph-sm, p, .paragraph, .utility-margin-bottom-0');
    // Defensive: If heading or desc is not found, try to find a div with text
    if (!heading) {
      heading = Array.from(card.children).find(el => el.tagName && el.tagName.match(/^H[1-6]$/));
    }
    if (!desc) {
      desc = Array.from(card.children).find(el => el.className && el.className.includes('paragraph'));
    }
    // If still missing, try to get all text content except from the image
    if (!heading && !desc) {
      const textDivs = Array.from(card.querySelectorAll('div, h1, h2, h3, h4, h5, h6, p')).filter(el => el !== img && el.textContent.trim());
      if (textDivs.length > 0) {
        return [img, textDivs];
      }
    }
    // Compose text cell content
    const textContent = [];
    if (heading) textContent.push(heading);
    if (desc && desc !== heading) textContent.push(desc);
    return [img, textContent];
  }

  // Find all grid layouts in all tab panes
  const allCards = [];
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((pane) => {
    const grid = pane.querySelector('.w-layout-grid');
    if (grid) {
      // Each card is an anchor (a)
      const cards = grid.querySelectorAll('a.utility-link-content-block, a.card-link');
      cards.forEach((card) => {
        const [img, textContent] = extractCardParts(card);
        // Only add cards with at least an image and some text
        if (img && textContent && textContent.length > 0) {
          allCards.push([img, textContent]);
        }
      });
    }
  });

  // Build the table rows
  const headerRow = ['Cards (cards23)'];
  const tableRows = [headerRow];
  allCards.forEach(([img, textContent]) => {
    tableRows.push([img, textContent]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
