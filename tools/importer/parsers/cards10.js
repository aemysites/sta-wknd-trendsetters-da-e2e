/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Table header row as required
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all direct card links (each card is an <a>)
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach(card => {
    // Defensive: find image (first child div with img)
    let img = card.querySelector('img');
    // Defensive: fallback if not found
    if (!img) return;

    // Text content container
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    // Defensive: fallback if not found
    if (!textContainer) return;

    // Compose text cell content
    const cellContent = [];

    // Tag (optional)
    const tagGroup = textContainer.querySelector('.tag-group');
    if (tagGroup) {
      cellContent.push(tagGroup);
    }

    // Heading (optional)
    const heading = textContainer.querySelector('h3, .h4-heading');
    if (heading) {
      cellContent.push(heading);
    }

    // Description (optional)
    const desc = textContainer.querySelector('p');
    if (desc) {
      cellContent.push(desc);
    }

    // Compose row: [image, text content]
    rows.push([img, cellContent]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
