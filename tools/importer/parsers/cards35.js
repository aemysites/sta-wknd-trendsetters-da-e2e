/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: 2 columns, images only (no text or CTA)
  // 1. Header row
  const headerRow = ['Cards (cards35)'];

  // 2. Find all card containers (each .utility-aspect-1x1 is a card)
  const cardDivs = Array.from(element.querySelectorAll('.utility-aspect-1x1'));

  // 3. For each card, extract the image (first cell), leave second cell empty (no text in this variant)
  const rows = cardDivs.map(div => {
    // Find the image inside the card
    const img = div.querySelector('img');
    // Defensive: only add row if img exists
    if (img) {
      // Reference the existing image element (do not clone)
      return [img, ''];
    }
    return null;
  }).filter(Boolean);

  // 4. Assemble the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // 5. Replace the original element with the new table
  element.replaceWith(table);
}
