/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card container
  function extractCard(cardDiv) {
    // Find the first image in the card
    const img = cardDiv.querySelector('img');
    // Find the heading and paragraph, if present
    let heading = null;
    let description = null;
    const paddingDiv = cardDiv.querySelector('.utility-padding-all-2rem');
    if (paddingDiv) {
      heading = paddingDiv.querySelector('h3');
      description = paddingDiv.querySelector('p');
    }
    // Compose the text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (description) textCell.push(description);
    return [img, textCell];
  }

  // Get all direct children of the grid element
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Only treat as cards those that have both image and text content
  const cards = cardDivs.filter(div => {
    // Must have an image
    const img = div.querySelector('img');
    // Must have either a heading or paragraph
    const paddingDiv = div.querySelector('.utility-padding-all-2rem');
    const hasText = paddingDiv && (paddingDiv.querySelector('h3') || paddingDiv.querySelector('p'));
    return img && hasText;
  });

  // Compose table rows
  const headerRow = ['Cards (cards26)'];
  const rows = cards.map(extractCard);
  const tableCells = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
