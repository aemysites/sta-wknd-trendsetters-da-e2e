/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match target block name exactly (one column only)
  const rows = [
    ['Cards (cards7)']
  ];

  // Get all direct children divs (each card is a div)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    let textContent = '';
    // Try to extract all text nodes inside the cardDiv, including alt text
    if (img && img.alt && img.alt.trim()) {
      textContent += img.alt.trim();
    }
    // Collect any additional text nodes inside the cardDiv (excluding img)
    Array.from(cardDiv.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        textContent += (textContent ? ' ' : '') + node.textContent.trim();
      }
    });
    // Ensure textContent is non-empty
    if (!textContent) textContent = 'Description';
    if (img) {
      rows.push([img, textContent]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
