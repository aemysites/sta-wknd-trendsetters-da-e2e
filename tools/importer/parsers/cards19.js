/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cards19)'];

  // Get all immediate card divs
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build rows for each card
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find icon image (mandatory)
    let iconImg = null;
    const iconDiv = cardDiv.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }
    // Defensive: If no image, leave cell blank
    const imageCell = iconImg ? iconImg : '';

    // Find text content (mandatory)
    // The paragraph is always present
    const textPara = cardDiv.querySelector('p');
    let textCell = '';
    if (textPara) {
      textCell = textPara;
    }
    // If there were a heading, we'd look for it here, but source only has paragraph

    return [imageCell, textCell];
  });

  // Compose the table cells
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
