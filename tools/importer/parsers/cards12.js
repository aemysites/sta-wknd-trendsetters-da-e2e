/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block parsing
  // 1. Header row
  const headerRow = ['Cards (cards12)'];

  // 2. Find all card links (each card is an <a> element)
  const cardLinks = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  // 3. Build rows for each card
  const rows = cardLinks.map(card => {
    // Image: first child div contains the image
    const imageDiv = card.querySelector('.utility-aspect-2x3');
    const img = imageDiv ? imageDiv.querySelector('img') : null;

    // Text content: tag + date + heading
    // Tag and date are inside the flex-horizontal div
    const metaDiv = card.querySelector('.flex-horizontal');
    let tag = null, date = null;
    if (metaDiv) {
      const metaChildren = metaDiv.children;
      tag = metaChildren[0] || null;
      date = metaChildren[1] || null;
    }
    // Heading
    const heading = card.querySelector('h3');

    // Compose text cell: tag, date, heading
    // Use a fragment to preserve structure
    const textCell = document.createElement('div');
    if (tag) textCell.appendChild(tag);
    if (date) textCell.appendChild(date);
    if (heading) textCell.appendChild(heading);

    // Row: [image, text]
    return [img, textCell];
  });

  // 4. Compose table data
  const tableData = [headerRow, ...rows];

  // 5. Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // 6. Replace original element
  element.replaceWith(block);
}
