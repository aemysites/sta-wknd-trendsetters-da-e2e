/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards19)'];

  // Get all direct card divs
  const cardDivs = element.querySelectorAll(':scope > div');

  // Prepare card rows
  const rows = Array.from(cardDivs).map(card => {
    // Find the icon (image)
    let iconImg = null;
    const iconDiv = card.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }

    // Defensive: If no image, create a placeholder span
    const imageCell = iconImg ? iconImg : document.createElement('span');

    // Find the text content (paragraph)
    const textP = card.querySelector('p');
    // Defensive: If no paragraph, create an empty span
    const textCell = textP ? textP : document.createElement('span');

    return [imageCell, textCell];
  });

  // Build the table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
