/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor
  function extractCardInfo(cardEl) {
    // Find the image (mandatory)
    const imgContainer = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = imgContainer ? imgContainer.querySelector('img') : null;
    // Defensive: fallback if image is not found
    if (!img) {
      img = cardEl.querySelector('img');
    }

    // Find the text content container
    // Some cards have a div for padding, some have h3/p directly
    let textContainer = cardEl.querySelector('.utility-padding-all-2rem');
    let heading, desc, cta;
    if (textContainer) {
      heading = textContainer.querySelector('h3, .h2-heading, .h4-heading');
      desc = textContainer.querySelector('p');
      cta = textContainer.querySelector('.button');
    } else {
      // Fallback: look for heading and p directly under anchor
      heading = cardEl.querySelector('h3, .h2-heading, .h4-heading');
      desc = cardEl.querySelector('p');
      cta = cardEl.querySelector('.button');
    }

    // Compose the text cell
    const textCellContent = [];
    if (heading) textCellContent.push(heading);
    if (desc) textCellContent.push(desc);
    if (cta) textCellContent.push(cta);
    return [img, textCellContent];
  }

  // Find the main grid containing cards
  const mainGrid = element.querySelector('.grid-layout');
  // The first card is a direct child <a>, the rest are inside a nested grid
  const cards = [];
  // First card
  const firstCard = mainGrid.querySelector(':scope > a.utility-link-content-block');
  if (firstCard) {
    cards.push(firstCard);
  }
  // Nested grid with more cards
  const nestedGrid = mainGrid.querySelector(':scope > .grid-layout');
  if (nestedGrid) {
    nestedGrid.querySelectorAll(':scope > a.utility-link-content-block').forEach(card => {
      cards.push(card);
    });
  }

  // Compose table rows
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];
  cards.forEach(cardEl => {
    const [img, textCellContent] = extractCardInfo(cardEl);
    rows.push([img, textCellContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with block
  element.replaceWith(block);
}
