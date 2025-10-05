/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child card anchors
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Table header: Block name as required
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // For each card, extract image and text content
  cards.forEach(card => {
    // Find image (mandatory)
    const imgContainer = card.querySelector(':scope > div.utility-aspect-3x2');
    let imageEl = null;
    if (imgContainer) {
      imageEl = imgContainer.querySelector('img');
    }
    // Defensive: If no image, skip this card
    if (!imageEl) return;

    // Find text content container
    const textContainer = card.querySelector(':scope > div.utility-padding-all-1rem');
    if (!textContainer) return;

    // Compose text cell content
    const textCellContent = [];

    // Tag (optional, above heading)
    const tagGroup = textContainer.querySelector('.tag-group');
    if (tagGroup) {
      textCellContent.push(tagGroup);
    }

    // Heading (optional)
    const heading = textContainer.querySelector('h3');
    if (heading) {
      textCellContent.push(heading);
    }

    // Description (optional)
    const desc = textContainer.querySelector('p');
    if (desc) {
      textCellContent.push(desc);
    }

    // Call-to-action: Only if not homepage
    if (card.href && card.getAttribute('href') !== '/' && card.getAttribute('href') !== '#') {
      let ctaText = heading ? heading.textContent.trim() : 'Learn more';
      const ctaLink = document.createElement('a');
      ctaLink.href = card.getAttribute('href');
      ctaLink.textContent = ctaText;
      textCellContent.push(ctaLink);
    }

    // Add row: [image, text content]
    rows.push([
      imageEl,
      textCellContent
    ]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
