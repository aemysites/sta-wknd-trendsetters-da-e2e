/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Defensive: get all immediate child <a> elements (each is a card)
  const cardEls = Array.from(element.querySelectorAll(':scope > a'));

  cardEls.forEach(card => {
    // Image cell: find the first img inside the card
    const imgWrapper = card.querySelector('.utility-aspect-3x2');
    let imgEl = imgWrapper ? imgWrapper.querySelector('img') : null;
    // Defensive fallback: if no img found, use null
    const imageCell = imgEl ? imgEl : document.createTextNode('');

    // Text cell: build content from tag, heading, paragraph, and link
    const textContent = [];

    // Tag (optional, above heading)
    const tagGroup = card.querySelector('.tag-group');
    if (tagGroup) {
      // Use the tag div directly
      const tagEl = tagGroup.querySelector('.tag');
      if (tagEl) textContent.push(tagEl);
    }

    // Heading (mandatory)
    const heading = card.querySelector('h3');
    if (heading) textContent.push(heading);

    // Description (optional)
    const desc = card.querySelector('p');
    if (desc) textContent.push(desc);

    // Call-to-action (optional): If the card itself is a link, add a CTA link at the bottom
    // Only add if href is not empty and not just '#'
    if (card.href && card.href !== '#' && card.href !== '') {
      // Only add CTA if there's no heading link inside already
      // Use link text: if heading exists, use heading text; else, generic 'Learn more'
      let ctaText = heading ? heading.textContent.trim() : 'Learn more';
      const ctaLink = document.createElement('a');
      ctaLink.href = card.href;
      ctaLink.textContent = ctaText;
      ctaLink.setAttribute('target', '_blank');
      ctaLink.className = 'card-cta';
      textContent.push(ctaLink);
    }

    rows.push([imageCell, textContent]);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
