/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  cards.forEach(card => {
    // Try to find the image (mandatory)
    let img = card.querySelector('img');
    // Defensive: if no image, skip this card
    if (!img) return;

    // Find text content
    let title = null;
    let desc = null;
    // Look for a container with text (usually inside .utility-padding-all-2rem)
    let textContainer = card.querySelector('.utility-padding-all-2rem');
    if (textContainer) {
      title = textContainer.querySelector('h3');
      desc = textContainer.querySelector('p');
    }
    // If not found, fallback to searching for h3/p anywhere inside card
    if (!title) title = card.querySelector('h3');
    if (!desc) desc = card.querySelector('p');

    // Compose text cell
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);

    // Defensive: if no title/desc, leave cell blank
    rows.push([
      img,
      textCell.length ? textCell : ''
    ]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
