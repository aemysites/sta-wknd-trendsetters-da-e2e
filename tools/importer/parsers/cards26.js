/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards26) block: extract cards with image, title, and description
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  // Helper to extract card content (image, title, description)
  function extractCard(cardDiv) {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');
    // Find heading (h3 or h2 or h4)
    const heading = cardDiv.querySelector('h3, h2, h4');
    // Find description (first <p> after heading)
    let description = null;
    if (heading) {
      description = heading.nextElementSibling && heading.nextElementSibling.tagName === 'P'
        ? heading.nextElementSibling
        : cardDiv.querySelector('p');
    } else {
      description = cardDiv.querySelector('p');
    }
    // Compose text cell: heading + description
    const textCell = document.createElement('div');
    if (heading) textCell.appendChild(heading.cloneNode(true));
    if (description) textCell.appendChild(description.cloneNode(true));
    // If no heading and no description, leave cell truly empty (do not add empty <p>)
    return [img, textCell.childNodes.length ? textCell : ''];
  }

  // Find all direct children that are cards (with image)
  const cardDivs = Array.from(element.children).filter((div) => div.querySelector('img'));

  cardDivs.forEach((cardDiv) => {
    rows.push(extractCard(cardDiv));
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
