/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block: extract each card's image and text content
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Select all card anchor elements (each card is an <a>)
  const cardAnchors = element.querySelectorAll('a.card-link');

  cardAnchors.forEach(card => {
    // Image cell: find the image inside the card
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    let img = imgContainer ? imgContainer.querySelector('img') : null;

    // Text cell: find the content container
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    // Defensive: If textContainer is missing, skip this card
    if (!img || !textContainer) return;

    // Compose text cell: include tag, heading, and paragraph
    // Tag
    const tagGroup = textContainer.querySelector('.tag-group');
    // Heading
    const heading = textContainer.querySelector('h3, .h4-heading');
    // Description
    const desc = textContainer.querySelector('p');

    // Compose cell contents in order
    const textCell = [];
    if (tagGroup) textCell.push(tagGroup);
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);

    rows.push([
      img,
      textCell
    ]);
  });

  // Create the block table and replace the element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
