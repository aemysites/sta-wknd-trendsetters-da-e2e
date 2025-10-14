/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block: 2 columns, multiple rows, each row = card
  // Header row
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Identify all card anchors (each card is an <a> inside the grid)
  const cardAnchors = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  cardAnchors.forEach(card => {
    // Image (first cell)
    const img = card.querySelector('img');

    // Card text area (second cell)
    // Find the direct child div that is not the grid
    const cardGrids = Array.from(card.querySelectorAll('.w-layout-grid'));
    let textDiv = null;
    if (cardGrids.length > 0) {
      // The text area is the first div inside the grid that is not an image
      textDiv = cardGrids[0].querySelector('div:not(.w-layout-grid)');
      // Defensive fallback: if not found, use the last div in the grid
      if (!textDiv) {
        const divs = cardGrids[0].querySelectorAll('div');
        textDiv = divs[divs.length - 1] || cardGrids[0];
      }
    } else {
      // Fallback: use the last div in the card
      const divs = card.querySelectorAll('div');
      textDiv = divs[divs.length - 1] || card;
    }

    // Tag and read time (usually in a flex-horizontal div)
    const metaDiv = textDiv.querySelector('.flex-horizontal');
    let tag = '', readTime = '';
    if (metaDiv) {
      const tagDiv = metaDiv.querySelector('.tag');
      if (tagDiv) tag = tagDiv.textContent.trim();
      const timeDiv = metaDiv.querySelector('.paragraph-sm');
      if (timeDiv) readTime = timeDiv.textContent.trim();
    }

    // Title (h3)
    const heading = textDiv.querySelector('h3');
    // Description (p)
    const desc = textDiv.querySelector('p');
    // CTA (usually 'Read')
    // If there is a CTA, wrap it in a link to the card's href
    let ctaDiv = Array.from(textDiv.children).find(child => child.textContent.trim().toLowerCase() === 'read');
    let ctaEl = null;
    if (ctaDiv) {
      ctaEl = document.createElement('a');
      ctaEl.href = card.href;
      ctaEl.textContent = ctaDiv.textContent;
    }

    // Compose text cell content
    const textCell = [];
    // Tag and read time
    if (tag || readTime) {
      const metaSpan = document.createElement('div');
      metaSpan.style.display = 'flex';
      metaSpan.style.gap = '0.5em';
      if (tag) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tag;
        tagSpan.className = 'tag';
        metaSpan.appendChild(tagSpan);
      }
      if (readTime) {
        const timeSpan = document.createElement('span');
        timeSpan.textContent = readTime;
        timeSpan.className = 'read-time';
        metaSpan.appendChild(timeSpan);
      }
      textCell.push(metaSpan);
    }
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (ctaEl) textCell.push(ctaEl);

    rows.push([img, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
