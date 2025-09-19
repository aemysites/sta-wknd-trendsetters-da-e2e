/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a grid child
  function extractCardContent(cardDiv) {
    // Find image
    const img = cardDiv.querySelector('img');
    // Find text content (title and description)
    let title = null;
    let desc = null;
    // Look for text container
    const textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    if (textContainer) {
      title = textContainer.querySelector('h3');
      desc = textContainer.querySelector('p');
    }
    // Defensive fallback: sometimes the card may not have text
    return [img, [title, desc].filter(Boolean)];
  }

  // Get all direct child divs (cards)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Build rows for table
  const rows = [];
  // Header row
  rows.push(['Cards (cards25)']);

  // For each card, build a row
  cardDivs.forEach((cardDiv) => {
    // Only include cards with an image
    const img = cardDiv.querySelector('img');
    if (!img) return; // skip if no image
    // Check for text content
    const textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    let textCell = null;
    if (textContainer) {
      // Use the entire text container for resilience
      textCell = textContainer;
    } else {
      // Defensive fallback: try to find any heading or paragraph
      const heading = cardDiv.querySelector('h3');
      const para = cardDiv.querySelector('p');
      if (heading || para) {
        const frag = document.createDocumentFragment();
        if (heading) frag.appendChild(heading);
        if (para) frag.appendChild(para);
        textCell = frag;
      } else {
        textCell = '';
      }
    }
    rows.push([img, textCell]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with block
  element.replaceWith(block);
}
