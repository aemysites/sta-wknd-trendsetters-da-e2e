/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block spec
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Defensive: get all direct card anchors
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach((card) => {
    // Find image (always in first child div)
    const imageWrapper = card.querySelector(':scope > div.utility-aspect-3x2');
    let img = null;
    if (imageWrapper) {
      img = imageWrapper.querySelector('img');
    }

    // Find text content (always in second child div)
    const textWrapper = card.querySelector(':scope > div.utility-padding-all-1rem');
    let tag = null, heading = null, desc = null;
    if (textWrapper) {
      // Tag (optional, but always present in these examples)
      const tagGroup = textWrapper.querySelector('.tag-group');
      if (tagGroup) {
        tag = tagGroup.querySelector('.tag');
      }
      // Heading (h3)
      heading = textWrapper.querySelector('h3');
      // Description (p)
      desc = textWrapper.querySelector('p');
    }

    // Compose text cell
    const textCellContent = [];
    if (tag) textCellContent.push(tag);
    if (heading) textCellContent.push(heading);
    if (desc) textCellContent.push(desc);
    // If the card itself is a link, but no explicit CTA, don't add a CTA
    // (per block spec, CTA is optional and not present in these examples)

    // Add row: [image, text content]
    rows.push([
      img || '',
      textCellContent
    ]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
