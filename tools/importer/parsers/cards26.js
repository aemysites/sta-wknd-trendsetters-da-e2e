/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Extract card content (image, title, description) from a card element
  function extractCardContent(cardEl) {
    const img = cardEl.querySelector('img');
    const heading = cardEl.querySelector('h3');
    const description = cardEl.querySelector('p');
    const textContent = [];
    if (heading) textContent.push(heading);
    if (description) textContent.push(description);
    // Always return a row if there is an image
    return [img, textContent.length ? textContent : ''];
  }

  // Include ALL cards with images, even if no text
  const cardDivs = Array.from(element.children).filter(div => div.querySelector('img'));

  // Build table rows
  const rows = [
    ['Cards (cards26)'], // Header row
  ];

  cardDivs.forEach(cardEl => {
    const row = extractCardContent(cardEl);
    rows.push(row);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the table
  element.replaceWith(table);
}
