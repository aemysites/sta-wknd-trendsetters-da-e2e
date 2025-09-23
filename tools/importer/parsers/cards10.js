/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required
  const headerRow = ['Cards (cards10)'];

  // Get all direct child <a> elements (each is a card)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Build rows for each card
  const rows = cards.map(card => {
    // Get the image (first .utility-aspect-3x2 img inside the card)
    const imageContainer = card.querySelector('.utility-aspect-3x2');
    let image = null;
    if (imageContainer) {
      image = imageContainer.querySelector('img');
    }

    // Get the text content container
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    let textContent = [];
    if (textContainer) {
      // Tag (optional, as a label/div)
      const tag = textContainer.querySelector('.tag-group .tag');
      if (tag) {
        textContent.push(tag);
      }
      // Title (h3)
      const title = textContainer.querySelector('h3');
      if (title) {
        textContent.push(title);
      }
      // Description (p)
      const desc = textContainer.querySelector('p');
      if (desc) {
        textContent.push(desc);
      }
      // Optionally, add CTA if present (not in this HTML, but for resilience)
      const cta = textContainer.querySelector('a');
      if (cta) {
        textContent.push(cta);
      }
    }

    // Defensive: fallback to card text if needed
    if (textContent.length === 0) {
      textContent = [card.textContent.trim()];
    }

    // Each row: [image, textContent]
    return [image, textContent];
  });

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
