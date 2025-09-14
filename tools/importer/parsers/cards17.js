/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.classList.contains('w-layout-grid')) return;

  // Header row for the block table, with exactly one column for the block name
  const headerRow = ['Cards (cards17)'];

  // Get all immediate children (each card wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build rows for each card
  const rows = Array.from(cardDivs).map((cardDiv) => {
    // Find the image inside the card
    const img = cardDiv.querySelector('img');
    // Get any text content from the cardDiv (alt text or other text nodes)
    let textContent = '';
    if (img && img.getAttribute('alt')) {
      textContent = img.getAttribute('alt');
    }
    const otherText = Array.from(cardDiv.childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent.trim())
      .filter(Boolean)
      .join(' ');
    if (otherText) {
      textContent = textContent ? `${textContent} ${otherText}` : otherText;
    }
    return [img || '', textContent];
  });

  // Compose the table data
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
