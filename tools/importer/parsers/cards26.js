/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card element
  function extractCard(cardDiv) {
    // Find the image (mandatory)
    const img = cardDiv.querySelector('img');
    // Find the text container (optional)
    let textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    if (!textContainer) {
      // Sometimes the text may be inside a .utility-position-relative or directly in the cardDiv
      textContainer = cardDiv.querySelector('.utility-position-relative') || cardDiv;
    }
    // Extract heading (if any)
    let heading = textContainer.querySelector('h3, h2, h1');
    // Extract description (if any)
    let desc = textContainer.querySelector('p');
    // Compose text cell content
    const textCellContent = [];
    if (heading) textCellContent.push(heading);
    if (desc) textCellContent.push(desc);
    // If neither heading nor desc, but text exists, fallback to all text nodes
    if (textCellContent.length === 0) {
      // Defensive: grab all text nodes
      const text = textContainer.textContent.trim();
      if (text) {
        const p = document.createElement('p');
        p.textContent = text;
        textCellContent.push(p);
      }
    }
    return [img, textCellContent];
  }

  // Get all immediate children that are cards (divs with an img)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div')).filter(div => div.querySelector('img'));

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards26)']);
  // Card rows
  cardDivs.forEach(cardDiv => {
    const [img, textCellContent] = extractCard(cardDiv);
    rows.push([img, textCellContent]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
