/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards2) block parsing
  // 1. Header row
  const headerRow = ['Cards (cards2)'];

  // 2. Find the main grid container holding all cards
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // 3. Gather all card elements (direct children that are <a> tags)
  const cardLinks = Array.from(grid.querySelectorAll(':scope > a.utility-link-content-block'));

  // 4. For each card, extract image, heading, description, and CTA if present
  const rows = cardLinks.map((card) => {
    // Find image: look for .utility-aspect-2x3 or .utility-aspect-1x1 inside the card
    const imageContainer = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    const img = imageContainer ? imageContainer.querySelector('img') : null;

    // Find text content container
    let textContainer = card.querySelector('.utility-padding-all-2rem');
    // If not found, fallback to card itself (for smaller cards)
    if (!textContainer) textContainer = card;

    // Heading: h3 or h4 inside textContainer
    const heading = textContainer.querySelector('h3, h4');
    // Description: first <p> inside textContainer
    const description = textContainer.querySelector('p');
    // CTA: look for .button inside textContainer
    const cta = textContainer.querySelector('.button');

    // Compose the text cell contents
    const textCell = [];
    if (heading) textCell.push(heading);
    if (description) textCell.push(description);
    if (cta) textCell.push(cta);

    return [img, textCell];
  });

  // 5. Build the table
  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // 6. Replace original element
  element.replaceWith(table);
}
