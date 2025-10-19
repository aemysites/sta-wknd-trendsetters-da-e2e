/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards36) block: extract cards from grid layout
  const headerRow = ['Cards (cards36)'];
  const rows = [headerRow];

  // Find all card containers (utility-aspect-1x1)
  const cardDivs = element.querySelectorAll('.utility-aspect-1x1');

  cardDivs.forEach((cardDiv) => {
    // Find the image inside each card
    const img = cardDiv.querySelector('img');
    let textContent = '';
    // Try to get any text content inside the cardDiv
    // (in case future cards include text, headings, etc.)
    // For now, use the alt text if present
    if (img) {
      textContent = img.getAttribute('alt') || '';
    }
    // If cardDiv has other text nodes, add them
    const extraText = Array.from(cardDiv.childNodes)
      .filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim())
      .map(n => n.textContent.trim())
      .join(' ');
    if (extraText) {
      textContent = textContent ? textContent + ' ' + extraText : extraText;
    }
    rows.push([img, textContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
