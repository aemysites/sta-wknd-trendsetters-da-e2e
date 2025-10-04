/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image from the card
  function getCardImage(card) {
    const imgWrapper = card.querySelector('div.utility-aspect-2x3');
    if (!imgWrapper) return '';
    const img = imgWrapper.querySelector('img');
    return img || '';
  }

  // Helper to extract the text content from the card
  function getCardTextContent(card) {
    // Tag and date
    const tagDateRow = card.querySelector('.flex-horizontal');
    let tag = '', date = '';
    if (tagDateRow) {
      const tagDiv = tagDateRow.querySelector('.tag');
      if (tagDiv) tag = tagDiv.textContent.trim();
      const dateDiv = tagDateRow.querySelector('.paragraph-sm');
      if (dateDiv) date = dateDiv.textContent.trim();
    }
    // Title (h3)
    const heading = card.querySelector('h3');
    // Compose the text content
    const frag = document.createDocumentFragment();
    if (tag || date) {
      const meta = document.createElement('div');
      if (tag) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tag;
        tagSpan.style.marginRight = '0.5em';
        meta.appendChild(tagSpan);
      }
      if (date) {
        const dateSpan = document.createElement('span');
        dateSpan.textContent = date;
        meta.appendChild(dateSpan);
      }
      meta.style.marginBottom = '0.5em';
      frag.appendChild(meta);
    }
    if (heading) {
      const h = document.createElement('h3');
      h.textContent = heading.textContent.trim();
      frag.appendChild(h);
    }
    return frag;
  }

  // Find all card links (each card is an <a> block child)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Build the table rows
  const rows = [];
  // Header row (single cell)
  rows.push(['Cards (cards12)']);

  // Each card: [image, text content]
  cards.forEach(card => {
    const img = getCardImage(card);
    const textContent = getCardTextContent(card);
    rows.push([
      img,
      textContent
    ]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
