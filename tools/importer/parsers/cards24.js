/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content
  function extractCard(card) {
    // Find the image (first div > img)
    const imageDiv = card.querySelector('div.utility-aspect-2x3');
    let image = null;
    if (imageDiv) {
      image = imageDiv.querySelector('img');
    }

    // Find the text content
    // Tag and date
    const metaDiv = card.querySelector('.flex-horizontal');
    let meta = null;
    if (metaDiv) {
      meta = metaDiv;
    }
    // Heading
    const heading = card.querySelector('h3, .h4-heading');

    // Compose the text cell
    const textCell = document.createElement('div');
    if (meta) textCell.appendChild(meta);
    if (heading) textCell.appendChild(heading);

    return [image, textCell];
  }

  // Build the table rows
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Each card is an <a> inside the grid
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');
  cards.forEach((card) => {
    rows.push(extractCard(card));
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
