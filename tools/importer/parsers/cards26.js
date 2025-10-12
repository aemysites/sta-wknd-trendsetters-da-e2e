/* global WebImporter */
export default function parse(element, { document }) {
  // Cards block header
  const headerRow = ['Cards (cards26)'];

  // Helper: Extract card content from a card container
  function extractCardContent(cardDiv) {
    // Find the first image within the card
    const img = cardDiv.querySelector('img');
    // Find heading and paragraph (if present)
    const textWrapper = cardDiv.querySelector('.utility-position-relative .utility-padding-all-2rem');
    let textContent = [];
    if (textWrapper) {
      const heading = textWrapper.querySelector('h3');
      const paragraph = textWrapper.querySelector('p');
      if (heading) textContent.push(heading);
      if (paragraph) textContent.push(paragraph);
    }
    // If no text content, leave cell empty
    return [img, textContent.length ? textContent : ''];
  }

  // Helper: Extract image-only card
  function extractImageCard(cardDiv) {
    const img = cardDiv.querySelector('img');
    return [img, ''];
  }

  // Get all immediate children (cards)
  const cardDivs = Array.from(element.children);
  const rows = [];
  cardDivs.forEach((cardDiv) => {
    // Cards with text: have .utility-position-relative inside
    if (cardDiv.querySelector('.utility-position-relative')) {
      rows.push(extractCardContent(cardDiv));
    } else {
      // Cards with only image
      rows.push(extractImageCard(cardDiv));
    }
  });

  // Build table data
  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
