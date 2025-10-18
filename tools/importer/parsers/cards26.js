/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards26) block: 2 columns, multiple rows
  // Header row
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  // Helper to extract card content
  function extractCardContent(cardDiv) {
    // Find the image (mandatory)
    const img = cardDiv.querySelector('img');
    // Find the text container (optional)
    let title = null;
    let desc = null;
    const textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    if (textContainer) {
      title = textContainer.querySelector('h3');
      desc = textContainer.querySelector('p');
    }
    // Compose text cell
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    // If no text, add a non-breaking space to ensure cell is never empty
    return [img, textCell.length ? textCell : document.createTextNode('\u00A0')];
  }

  // Select all direct card children (each card is a direct child div)
  const cardDivs = Array.from(element.children);
  cardDivs.forEach(cardDiv => {
    // Defensive: Only process if there's an image
    const img = cardDiv.querySelector('img');
    if (img) {
      rows.push(extractCardContent(cardDiv));
    }
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
