/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Extracts card info from an <a> card element
  function extractCardInfo(card) {
    // Find image (first img descendant)
    const img = card.querySelector('img');

    // Find text content container (the div after the image)
    // Defensive: get all divs that are not .flex-horizontal (which is the tag/reading time row)
    const contentDivs = Array.from(card.querySelectorAll('div'));
    let textContentDiv = null;
    for (const div of contentDivs) {
      // The div containing h3 is the main text content
      if (div.querySelector('h3')) {
        textContentDiv = div;
        break;
      }
    }
    // Defensive fallback if not found
    if (!textContentDiv) {
      textContentDiv = card;
    }

    // Now, from textContentDiv, extract:
    // - Title (h3)
    // - Description (p)
    // - Call-to-action (the last div with text 'Read', but not the tag/reading time row)
    // We'll keep the tag/reading time row as well, as it's visually grouped at the top

    // Tag and reading time row
    const tagRow = textContentDiv.querySelector('.flex-horizontal');
    // Title
    const title = textContentDiv.querySelector('h3');
    // Description
    const desc = textContentDiv.querySelector('p');
    // CTA (the last div with textContent 'Read')
    let cta = null;
    const divs = Array.from(textContentDiv.querySelectorAll('div'));
    for (let i = divs.length - 1; i >= 0; i--) {
      if (divs[i].textContent.trim().toLowerCase() === 'read') {
        cta = divs[i];
        break;
      }
    }

    // Compose text cell content as an array
    const textCell = [];
    if (tagRow) textCell.push(tagRow);
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);

    return [img, textCell];
  }

  // Get all direct child <a> elements (cards)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Table header
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // For each card, extract info and push as a row
  cards.forEach(card => {
    rows.push(extractCardInfo(card));
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
