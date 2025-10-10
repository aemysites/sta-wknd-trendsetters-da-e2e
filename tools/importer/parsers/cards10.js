/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block parsing
  // 1. Header row
  const headerRow = ['Cards (cards10)'];

  // 2. Find all card elements (each <a.card-link>)
  const cardLinks = element.querySelectorAll('a.card-link');

  // 3. Build rows for each card
  const rows = Array.from(cardLinks).map(card => {
    // --- Image cell ---
    // Find the image inside the card
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    const img = imgContainer ? imgContainer.querySelector('img') : null;
    // Defensive: if no image, use empty string
    const imageCell = img || '';

    // --- Text cell ---
    // Tag (optional)
    const tag = card.querySelector('.tag');
    // Title (h3)
    const title = card.querySelector('h3');
    // Description (p)
    const desc = card.querySelector('p');
    // Compose text cell: tag, title, description
    const textCellContent = [];
    if (tag) textCellContent.push(tag);
    if (title) textCellContent.push(title);
    if (desc) textCellContent.push(desc);
    // Defensive: if nothing found, use empty string
    const textCell = textCellContent.length ? textCellContent : '';
    return [imageCell, textCell];
  });

  // 4. Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // 5. Replace original element
  element.replaceWith(table);
}
