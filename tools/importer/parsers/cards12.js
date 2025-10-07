/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block: extract multiple cards from a grid layout
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Select all direct child anchor tags (each is a card)
  const cardLinks = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  cardLinks.forEach((card) => {
    // Find the image (first .utility-aspect-2x3 inside the card)
    const imageContainer = card.querySelector('.utility-aspect-2x3');
    let imageEl = null;
    if (imageContainer) {
      imageEl = imageContainer.querySelector('img');
    }

    // Find the tag bar (category and date)
    const tagBar = card.querySelector('.flex-horizontal');
    let tagText = '';
    let dateText = '';
    if (tagBar) {
      const tagEl = tagBar.querySelector('.tag');
      const dateEl = tagBar.querySelector('.paragraph-sm');
      if (tagEl) tagText = tagEl.textContent.trim();
      if (dateEl) dateText = dateEl.textContent.trim();
    }

    // Find the heading
    const headingEl = card.querySelector('h3');
    let heading = '';
    if (headingEl) heading = headingEl.textContent.trim();

    // Compose the text cell: tag/date bar + heading
    // Tag/date bar as a horizontal flex container
    const tagBarFragment = document.createElement('div');
    tagBarFragment.style.display = 'flex';
    tagBarFragment.style.gap = '0.5em';
    if (tagText) {
      const tagSpan = document.createElement('span');
      tagSpan.textContent = tagText;
      tagSpan.style.fontWeight = 'bold';
      tagBarFragment.appendChild(tagSpan);
    }
    if (dateText) {
      const dateSpan = document.createElement('span');
      dateSpan.textContent = dateText;
      tagBarFragment.appendChild(dateSpan);
    }

    // Heading as a block below the tag bar
    let headingNode = null;
    if (heading) {
      headingNode = document.createElement('h4');
      headingNode.textContent = heading;
      headingNode.style.margin = '0.5em 0 0 0';
    }

    // Compose text cell contents
    const textCellContents = [tagBarFragment];
    if (headingNode) textCellContents.push(headingNode);

    // Add the row: [image, text cell]
    rows.push([
      imageEl,
      textCellContents
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
