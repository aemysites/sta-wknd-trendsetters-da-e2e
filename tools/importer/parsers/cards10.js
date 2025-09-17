/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists and is a container of cards
  if (!element || !element.querySelectorAll) return;

  // Table header row
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all card elements (direct children that are links)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a.card-link'));

  cardLinks.forEach((card) => {
    // Find the image container (first child div with an img inside)
    const imageContainer = card.querySelector('.utility-aspect-3x2');
    let imageEl = null;
    if (imageContainer) {
      imageEl = imageContainer.querySelector('img');
    }

    // Find the text container (second child div)
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    // Defensive: ensure textContainer exists
    let textContent = [];
    if (textContainer) {
      // Tag (optional)
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) {
        textContent.push(tagGroup);
      }
      // Heading (optional)
      const heading = textContainer.querySelector('h3, .h4-heading');
      if (heading) {
        textContent.push(heading);
      }
      // Description (optional)
      const desc = textContainer.querySelector('p');
      if (desc) {
        textContent.push(desc);
      }
    }
    // Compose the row: image in first cell, text in second cell
    const row = [imageEl, textContent];
    rows.push(row);
  });

  // Create block table and replace original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
