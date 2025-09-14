/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row: exactly one column
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  // Get all card wrappers (direct children)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each card div, extract the image and create a row with two columns
  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    let textContent = '';
    // Try to find any text content inside the cardDiv (not just alt)
    // If there is no text, fallback to image alt
    const textNodes = Array.from(cardDiv.childNodes)
      .filter(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0)
      .map(node => node.textContent.trim());
    if (textNodes.length > 0) {
      textContent = textNodes.join(' ');
    } else if (img && img.alt && img.alt.trim()) {
      textContent = img.alt.trim();
    }
    rows.push([img, textContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
