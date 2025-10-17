/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards26) block: 2 columns, multiple rows
  // Each card: [image, text content]

  // Header row as required
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  // Find all direct child divs (each is a card or image card)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach(card => {
    // Find the first image in the card (mandatory)
    const img = card.querySelector('img');
    if (!img) return;

    // Extract only the heading and paragraph elements (no extra container divs)
    const h3 = card.querySelector('h3');
    const p = card.querySelector('p');
    const frag = document.createDocumentFragment();
    if (h3) frag.appendChild(h3.cloneNode(true));
    if (p) frag.appendChild(p.cloneNode(true));

    rows.push([img, frag]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
