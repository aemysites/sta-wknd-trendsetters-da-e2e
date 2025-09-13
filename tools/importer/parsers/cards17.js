/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !document) return;

  // Header row as per block guidelines (must be exactly one column)
  const headerRow = ['Cards (cards17)'];

  // Get all immediate children (each card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Each card is a div.utility-aspect-1x1 containing an img
  const rows = [];
  cardDivs.forEach((cardDiv) => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    if (!img) return; // skip if no image

    // Use the entire alt text as the mandatory text content for each card
    let textContent = '';
    if (img.hasAttribute('alt')) {
      textContent = img.getAttribute('alt');
    }
    // Also check for any additional text nodes in the cardDiv (excluding the image)
    const extraText = Array.from(cardDiv.childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim())
      .map(node => node.textContent.trim())
      .join(' ');
    if (extraText) {
      textContent = textContent ? `${textContent} ${extraText}` : extraText;
    }
    rows.push([img, textContent]);
  });

  // Compose table cells: header + card rows
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
