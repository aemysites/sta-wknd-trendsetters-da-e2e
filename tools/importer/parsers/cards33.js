/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct card links
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Header row as specified
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  cardLinks.forEach((cardLink) => {
    // Find the image (first img in the card)
    const img = cardLink.querySelector('img');

    // Find the text content container (the div after the image)
    // Structure is <a><div><img/><div>...</div></div></a> or <a><img/><div>...</div></a>
    let textContentDiv;
    if (cardLink.firstElementChild) {
      if (cardLink.firstElementChild.tagName === 'DIV') {
        // Look for the div after the img inside this div
        const allDivs = cardLink.firstElementChild.querySelectorAll(':scope > div');
        // The text content is likely the second div
        textContentDiv = allDivs[1] || allDivs[0];
      } else if (cardLink.firstElementChild.tagName === 'IMG') {
        // If structure is <a><img/><div>...</div></a>
        textContentDiv = cardLink.querySelector(':scope > div');
      }
    }
    // Defensive fallback: if not found, use the cardLink itself
    if (!textContentDiv) textContentDiv = cardLink;

    // Compose the row: [image, text content]
    // Reference the actual elements, not clones
    rows.push([
      img,
      textContentDiv
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
