/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all direct card links (each card is an <a>)
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach((card) => {
    // Image: always first child div contains the image
    const imageDiv = card.querySelector(':scope > div.utility-aspect-3x2');
    let imageEl = null;
    if (imageDiv) {
      imageEl = imageDiv.querySelector('img');
    }

    // Text content: second child div
    const contentDiv = card.querySelector(':scope > div.utility-padding-all-1rem');
    let tagEl = null;
    let headingEl = null;
    let descEl = null;
    let ctaEl = null;
    if (contentDiv) {
      // Tag (optional, usually present)
      const tagGroup = contentDiv.querySelector('.tag-group');
      if (tagGroup) {
        tagEl = tagGroup.querySelector('.tag');
      }
      // Heading
      headingEl = contentDiv.querySelector('h3, .h4-heading');
      // Description
      descEl = contentDiv.querySelector('p');
      // CTA: If the card <a> has an href and it's not just '/', create a link
      if (card.href && card.getAttribute('href') && card.getAttribute('href') !== '/') {
        ctaEl = document.createElement('a');
        ctaEl.href = card.getAttribute('href');
        ctaEl.textContent = 'Learn more';
      }
    }

    // Compose text cell
    const textCell = [];
    if (tagEl) textCell.push(tagEl);
    if (headingEl) textCell.push(headingEl);
    if (descEl) textCell.push(descEl);
    if (ctaEl) textCell.push(ctaEl);

    // Add row: [image, text]
    rows.push([
      imageEl || '',
      textCell.length ? textCell : ''
    ]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
