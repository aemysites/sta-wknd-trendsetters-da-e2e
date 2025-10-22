/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block: 2 columns, multiple rows
  // Header row
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Select all card anchor elements (each card is an <a> with a grid inside)
  const cardAnchors = element.querySelectorAll('a.utility-link-content-block');

  cardAnchors.forEach((card) => {
    // --- Image (first column) ---
    const img = card.querySelector('img');

    // --- Text content (second column) ---
    // Find the inner grid div that contains all text
    const innerGrid = card.querySelector('div.w-layout-grid');
    // Defensive: fallback to card if not found
    const textContainer = innerGrid || card;

    // Collect tag and read time (meta info)
    const metaRow = textContainer.querySelector('.flex-horizontal');
    // Heading
    const heading = textContainer.querySelector('h3, .h4-heading, h4');
    // Description
    const description = textContainer.querySelector('p');
    // CTA ("Read")
    // Sometimes a div, sometimes a link, get the last child div with textContent 'Read'
    let cta = null;
    const ctaCandidates = Array.from(textContainer.querySelectorAll('div'));
    cta = ctaCandidates.find(div => div.textContent.trim().toLowerCase() === 'read');
    // If not found, fallback to null

    // Compose text cell
    const textCellContent = [];
    if (metaRow) textCellContent.push(metaRow);
    if (heading) textCellContent.push(heading);
    if (description) textCellContent.push(description);
    if (cta) textCellContent.push(cta);

    // Add row: [image, text content]
    rows.push([
      img,
      textCellContent
    ]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
