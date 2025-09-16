/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists and is a grid of cards
  if (!element || !element.classList.contains('grid-layout')) return;

  // Header row for this block type
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all direct card links (each card is an <a>)
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  cards.forEach((card) => {
    // Find image container (usually first child div)
    const imageDiv = card.querySelector('.utility-aspect-3x2');
    let imageEl = null;
    if (imageDiv) {
      imageEl = imageDiv.querySelector('img');
    }
    // Defensive: If no image found, skip this card
    if (!imageEl) return;

    // Find content container (usually second child div)
    const contentDiv = card.querySelector('.utility-padding-all-1rem');
    // Defensive: If no content, skip
    if (!contentDiv) return;

    // Compose the text cell
    // We'll include the tag, heading, and paragraph as they appear
    const tagGroup = contentDiv.querySelector('.tag-group');
    const heading = contentDiv.querySelector('h3, .h4-heading');
    const paragraph = contentDiv.querySelector('p');

    // Compose array of elements for text cell
    const textCell = [];
    if (tagGroup) textCell.push(tagGroup);
    if (heading) textCell.push(heading);
    if (paragraph) textCell.push(paragraph);

    // Each row: [image, text]
    rows.push([
      imageEl,
      textCell
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with block table
  element.replaceWith(block);
}
