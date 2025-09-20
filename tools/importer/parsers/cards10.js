/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Defensive: Get all direct child <a> elements (each card)
  const cardLinks = element.querySelectorAll(':scope > a');

  cardLinks.forEach(card => {
    // Get image (first card child div contains img)
    const imgDiv = card.querySelector(':scope > div');
    let img = imgDiv ? imgDiv.querySelector('img') : null;

    // Get text content container (second card child div)
    const textDiv = card.querySelectorAll(':scope > div')[1];
    let textContent = [];

    if (textDiv) {
      // Tag (optional, always present in source)
      const tagGroup = textDiv.querySelector('.tag-group');
      if (tagGroup) {
        // Use the tag div directly
        const tag = tagGroup.querySelector('.tag');
        if (tag) {
          textContent.push(tag);
        }
      }

      // Title (h3)
      const heading = textDiv.querySelector('h3');
      if (heading) {
        textContent.push(heading);
      }

      // Description (p)
      const desc = textDiv.querySelector('p');
      if (desc) {
        textContent.push(desc);
      }
    }

    // Each card row: [image, textContent]
    // Use array for textContent to preserve structure
    rows.push([
      img ? img : '',
      textContent.length ? textContent : ''
    ]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
