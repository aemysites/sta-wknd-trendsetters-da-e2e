/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each card anchor
  function extractCardInfo(cardAnchor) {
    // Find the image (mandatory)
    const img = cardAnchor.querySelector('img');

    // Find the card content container (the div after the image)
    const contentDiv = img.nextElementSibling;

    // Defensive: fallback if structure changes
    if (!contentDiv) {
      return [img, ''];
    }

    // Find the tag (e.g., 'Chill', 'Sunny', etc.)
    const tagDiv = contentDiv.querySelector('.tag');
    let tagText = '';
    if (tagDiv) {
      tagText = tagDiv.textContent.trim();
    }
    // Find the read time (e.g., '3 min read')
    const readTimeDiv = contentDiv.querySelector('.paragraph-sm');
    let readTimeText = '';
    if (readTimeDiv) {
      readTimeText = readTimeDiv.textContent.trim();
    }
    // Find the heading (h3)
    const heading = contentDiv.querySelector('h3, h4, h2, h1');
    // Find the description (first <p> after heading)
    const description = contentDiv.querySelector('p');
    // Find the call to action (the last div, usually 'Read')
    let ctaDiv = null;
    const divs = contentDiv.querySelectorAll('div');
    divs.forEach(div => {
      if (div.textContent.trim().toLowerCase() === 'read') {
        ctaDiv = div;
      }
    });
    // Build CTA link if present
    let ctaLink = null;
    if (ctaDiv) {
      ctaLink = document.createElement('a');
      ctaLink.href = cardAnchor.href;
      ctaLink.textContent = ctaDiv.textContent.trim();
    }

    // Compose text cell content
    const textContent = document.createElement('div');
    // Tag and read time in a horizontal flex
    if (tagText || readTimeText) {
      const meta = document.createElement('div');
      if (tagText) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tagText;
        tagSpan.style.fontWeight = 'bold';
        meta.appendChild(tagSpan);
      }
      if (readTimeText) {
        if (tagText) meta.appendChild(document.createTextNode(' '));
        const timeSpan = document.createElement('span');
        timeSpan.textContent = readTimeText;
        meta.appendChild(timeSpan);
      }
      textContent.appendChild(meta);
    }
    if (heading) textContent.appendChild(heading.cloneNode(true));
    if (description) textContent.appendChild(description.cloneNode(true));
    if (ctaLink) textContent.appendChild(ctaLink);

    return [img, textContent.childNodes.length ? Array.from(textContent.childNodes) : ''];
  }

  // Get all direct child anchors (cards)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Build table rows
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  cards.forEach(cardAnchor => {
    rows.push(extractCardInfo(cardAnchor));
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
