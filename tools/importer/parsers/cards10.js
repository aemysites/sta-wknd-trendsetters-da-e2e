/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists and is a container of cards
  if (!element || !document) return;

  // Table header row as required
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all direct card links (each card is an <a>)
  const cardLinks = element.querySelectorAll(':scope > a.card-link');

  cardLinks.forEach(card => {
    // Find image (first child div contains img)
    const imageDiv = card.querySelector(':scope > div.utility-aspect-3x2');
    let img = null;
    if (imageDiv) {
      img = imageDiv.querySelector('img');
    }

    // Find text content (second child div)
    const textDiv = card.querySelector(':scope > div.utility-padding-all-1rem');
    let textContent = [];
    if (textDiv) {
      // Tag (optional)
      const tag = textDiv.querySelector('.tag');
      if (tag) {
        textContent.push(tag);
      }
      // Heading (optional)
      const heading = textDiv.querySelector('h3, .h4-heading');
      if (heading) {
        textContent.push(heading);
      }
      // Description (optional)
      const desc = textDiv.querySelector('p');
      if (desc) {
        textContent.push(desc);
      }
    }
    // Defensive: ensure at least image and some text
    if (img && textContent.length > 0) {
      rows.push([
        img,
        textContent.length === 1 ? textContent[0] : textContent
      ]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
