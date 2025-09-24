/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from an anchor card element
  function extractCardContent(cardEl) {
    // Find the image (first img in the card)
    const img = cardEl.querySelector('img');
    // Find the text container (the div after the image)
    const textContainer = cardEl.querySelector('div:not(.flex-horizontal)');
    // Defensive: If textContainer is null, fallback to cardEl
    const tc = textContainer || cardEl;

    // Extract tag/label and read time (optional, can be included in description)
    const tagRow = tc.querySelector('.flex-horizontal');
    let tagText = '';
    let readTime = '';
    if (tagRow) {
      const tagDiv = tagRow.querySelector('.tag');
      if (tagDiv) {
        tagText = tagDiv.textContent.trim();
      }
      const readDiv = tagRow.querySelector('.paragraph-sm');
      if (readDiv) {
        readTime = readDiv.textContent.trim();
      }
    }

    // Extract heading (h3)
    const heading = tc.querySelector('h3');
    // Extract description (first p)
    const description = tc.querySelector('p');
    // Extract CTA (the last div with text 'Read')
    let cta = null;
    const ctaDivs = Array.from(tc.querySelectorAll('div'));
    for (let div of ctaDivs) {
      if (div.textContent.trim().toLowerCase() === 'read') {
        // Create a link element for CTA
        cta = document.createElement('a');
        cta.href = cardEl.href;
        cta.textContent = 'Read';
        break;
      }
    }

    // Compose the text cell
    const textParts = [];
    // Tag and read time row (optional)
    if (tagText || readTime) {
      const tagSpan = document.createElement('span');
      tagSpan.style.fontSize = 'smaller';
      tagSpan.style.marginRight = '0.5em';
      tagSpan.textContent = tagText;
      const readSpan = document.createElement('span');
      readSpan.style.fontSize = 'smaller';
      readSpan.textContent = readTime;
      const tagRowDiv = document.createElement('div');
      tagRowDiv.appendChild(tagSpan);
      tagRowDiv.appendChild(readSpan);
      textParts.push(tagRowDiv);
    }
    // Heading
    if (heading) {
      textParts.push(heading);
    }
    // Description
    if (description) {
      textParts.push(description);
    }
    // CTA
    if (cta) {
      textParts.push(cta);
    }

    return [img, textParts];
  }

  // Get all card anchor elements (direct children)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards34)']);
  // Card rows
  cards.forEach(cardEl => {
    rows.push(extractCardContent(cardEl));
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
