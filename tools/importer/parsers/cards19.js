/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per block requirements
  const headerRow = ['Cards (cards19)'];

  // Get all direct card containers (each card is a direct child div)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Prepare card rows
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the icon/image (first img inside .icon)
    let iconImg = null;
    const iconDiv = cardDiv.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }

    // Defensive: if no image, create a placeholder span
    const imageCell = iconImg || document.createElement('span');

    // Find the text content (first p inside the card)
    const textP = cardDiv.querySelector('p');
    // Defensive: if no p, fallback to textContent
    const textCell = textP || document.createElement('span');
    if (!textP) {
      textCell.textContent = cardDiv.textContent.trim();
    }

    return [imageCell, textCell];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
