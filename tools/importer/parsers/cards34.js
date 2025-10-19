/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block: extract each card's image and text content
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Select all card anchor elements (each is a card)
  const cardLinks = element.querySelectorAll('a.utility-link-content-block');

  cardLinks.forEach(card => {
    // Image (first cell)
    const img = card.querySelector('img');

    // Text content (second cell)
    // Find the div that contains the text (not the grid, not the image)
    // It's always the div after the img
    let textDiv = null;
    const divs = card.querySelectorAll('div');
    for (const div of divs) {
      if (!div.querySelector('img')) {
        textDiv = div;
        break;
      }
    }
    if (!textDiv) textDiv = divs[1] || divs[0];

    // Compose text cell contents
    const textParts = [];

    // Tag and read time (metadata row)
    const metaRow = textDiv.querySelector('.flex-horizontal');
    if (metaRow) textParts.push(metaRow);

    // Heading (h3)
    const heading = textDiv.querySelector('h3');
    if (heading) textParts.push(heading);

    // Description (p)
    const desc = textDiv.querySelector('p');
    if (desc) textParts.push(desc);

    // CTA ("Read")
    // Find the last child div with text 'Read' (case-insensitive, trimmed)
    const cta = Array.from(textDiv.children).reverse().find(child => child.textContent.trim().toLowerCase() === 'read');
    if (cta) textParts.push(cta);

    rows.push([img, textParts]);
  });

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
