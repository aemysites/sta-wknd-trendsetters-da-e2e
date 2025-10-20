/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards36) block: header row, then one row per card (image-only, no text column)
  const headerRow = ['Cards (cards36)'];
  const rows = [headerRow];

  // Find all card containers (utility-aspect-1x1)
  const cardDivs = element.querySelectorAll('.utility-aspect-1x1');

  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    // Only image in each row, no text column
    rows.push([img]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element with block
  element.replaceWith(block);
}
