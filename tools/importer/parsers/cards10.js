/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block: 2 columns, first row is block name, each row is a card (image | text)
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Select all card links (each card is an <a> with class 'card-link')
  const cardLinks = element.querySelectorAll('a.card-link');

  cardLinks.forEach((card) => {
    // --- IMAGE CELL ---
    // Find the image inside the card
    const img = card.querySelector('img');
    // Defensive: if no image, leave cell empty
    const imageCell = img ? img : '';

    // --- TEXT CELL ---
    // Find the tag (optional)
    const tag = card.querySelector('.tag');
    // Find the heading (h3)
    const heading = card.querySelector('h3');
    // Find the description (p)
    const desc = card.querySelector('p');
    // Compose text cell content
    const textContent = [];
    if (tag) textContent.push(tag);
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    // If the card is a link, but no explicit CTA, do not add a CTA link (per screenshot, cards are clickable, but no CTA text)
    // If you want to wrap the whole text in a link, but per block description, skip unless explicit CTA
    rows.push([imageCell, textContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
