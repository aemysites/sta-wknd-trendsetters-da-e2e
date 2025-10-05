/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by block spec
  const headerRow = ['Cards (cards12)'];

  // Get all direct child <a> elements (each is a card)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Build table rows for each card
  const rows = cards.map(card => {
    // Find image (first image inside the card)
    const imgWrapper = card.querySelector('.utility-aspect-2x3');
    let image = imgWrapper ? imgWrapper.querySelector('img') : null;
    // Defensive: fallback to any img inside card
    if (!image) image = card.querySelector('img');

    // Build text content cell
    const textCellContent = [];

    // Tag and date row
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) {
      // Clone tag and date elements for clean separation
      const tag = tagRow.querySelector('.tag');
      const date = tagRow.querySelector('.paragraph-sm');
      if (tag || date) {
        const tagDateDiv = document.createElement('div');
        if (tag) tagDateDiv.appendChild(tag.cloneNode(true));
        if (date) tagDateDiv.appendChild(date.cloneNode(true));
        textCellContent.push(tagDateDiv);
      }
    }

    // Title (h3)
    const title = card.querySelector('h3');
    if (title) {
      textCellContent.push(title);
    }

    // Optionally: add link as CTA if needed (not present in this layout)
    // If you want the whole card to be clickable, you could add the link at the bottom
    // But per block spec, only if there's a CTA text, which is not present here

    // Table row: [image, text content]
    return [image, textCellContent];
  });

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
