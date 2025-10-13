/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Cards (cards26)'];

  // Helper to extract card info from a card element
  function extractCard(cardEl) {
    // Find the first image inside the card
    const img = cardEl.querySelector('img');

    // Find heading (h3, h2, h4, etc.) and description (p)
    let heading = cardEl.querySelector('h1, h2, h3, h4, h5, h6');
    let desc = cardEl.querySelector('p');

    // Compose the text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    // Always return two columns: image and text (empty if none)
    return [img, textCell.length ? textCell : ''];
  }

  // Only include direct children that are cards (contain an img)
  const cardNodes = Array.from(element.children).filter(div => div.querySelector('img'));

  // Build rows for each card
  const rows = cardNodes.map(cardEl => extractCard(cardEl));

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
