/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block: extract each card's image, tag, heading, and description
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Select all card anchor elements (each card is an <a> inside the grid container)
  const cardLinks = element.querySelectorAll('a.card-link');

  cardLinks.forEach((card) => {
    // Image: always in the first child div of the anchor
    const imageWrapper = card.querySelector('.utility-aspect-3x2');
    const img = imageWrapper ? imageWrapper.querySelector('img') : null;

    // Text content: always in the second child div of the anchor
    const textWrapper = card.querySelector('.utility-padding-all-1rem');
    // Tag (optional): inside .tag-group > .tag
    const tagGroup = textWrapper ? textWrapper.querySelector('.tag-group') : null;
    const tag = tagGroup ? tagGroup.querySelector('.tag') : null;
    // Heading (optional): h3.h4-heading
    const heading = textWrapper ? textWrapper.querySelector('h3') : null;
    // Description (optional): p.paragraph-sm
    const description = textWrapper ? textWrapper.querySelector('p') : null;

    // Compose the text cell
    const textCellContent = [];
    if (tag) textCellContent.push(tag);
    if (heading) textCellContent.push(heading);
    if (description) textCellContent.push(description);

    rows.push([
      img || '',
      textCellContent
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
