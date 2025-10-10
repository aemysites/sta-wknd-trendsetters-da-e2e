/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards26) block header
  const headerRow = ['Cards (cards26)'];

  // Helper: extract card content from a card container
  function extractCardContent(cardDiv) {
    // Find the first image in the card (mandatory)
    const img = cardDiv.querySelector('img');

    // Find heading and description (if present)
    let heading = null;
    let description = null;
    const headingEl = cardDiv.querySelector('h1, h2, h3, h4, h5, h6');
    if (headingEl) heading = headingEl;
    // Look for p tag after the heading
    if (headingEl) {
      let next = headingEl.nextElementSibling;
      while (next && next.tagName.toLowerCase() !== 'p') {
        next = next.nextElementSibling;
      }
      if (next && next.tagName.toLowerCase() === 'p') {
        description = next;
      }
    } else {
      // If no heading, maybe just a p
      const p = cardDiv.querySelector('p');
      if (p) description = p;
    }

    // Compose text cell content
    const textContent = [];
    if (heading) textContent.push(heading);
    if (description) textContent.push(description);

    // Defensive: If no heading or description, just use all text nodes
    if (textContent.length === 0) {
      const paragraphs = Array.from(cardDiv.querySelectorAll('p'));
      textContent.push(...paragraphs);
    }
    if (textContent.length === 0) textContent.push('');

    return [img, textContent];
  }

  // Find all direct card containers (divs with an image inside)
  const cardDivs = Array.from(element.children).filter(div => div.querySelector('img'));

  // Build the table rows for each card
  const rows = cardDivs.map(cardDiv => extractCardContent(cardDiv));

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
