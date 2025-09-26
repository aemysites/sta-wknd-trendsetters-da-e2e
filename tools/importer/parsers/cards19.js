/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the icon (img) and all text content for each card
  function extractCardContent(cardDiv) {
    // Find the icon image
    let img = cardDiv.querySelector('.icon img');
    if (!img) img = cardDiv.querySelector('img');
    // Clone the image to avoid moving it from the DOM
    let imgClone = img ? img.cloneNode(true) : null;

    // Collect all text nodes and <p> elements in cardDiv
    let textContent = '';
    // Prefer <p> elements
    const ps = cardDiv.querySelectorAll('p');
    if (ps.length > 0) {
      textContent = Array.from(ps).map(p => p.textContent.trim()).join(' ');
    } else {
      // Fallback: get all textContent from cardDiv, minus icon
      let clone = cardDiv.cloneNode(true);
      // Remove icon divs
      clone.querySelectorAll('.icon').forEach(iconDiv => iconDiv.remove());
      textContent = clone.textContent.trim();
    }
    // Defensive: if nothing, skip
    if (!imgClone || !textContent) return null;
    // Wrap text in a <span> for block cell
    const span = document.createElement('span');
    span.textContent = textContent;
    return [imgClone, span];
  }

  // Get all immediate children (cards)
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  // Build the table rows
  const rows = [];
  // Header row as per block guidelines
  rows.push(['Cards (cards19)']);

  // For each card, extract icon and text
  cards.forEach((cardDiv) => {
    const content = extractCardContent(cardDiv);
    if (content) {
      rows.push(content);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
