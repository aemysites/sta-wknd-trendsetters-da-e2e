/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card anchor element
  function extractCardInfo(cardEl) {
    // Image: look for the first img inside the card
    let img = cardEl.querySelector('img');
    // If no image, try to find a fallback icon (not present in this HTML, but required by block)
    if (!img) {
      // Try to find an image in siblings (for text-only cards, check previous card with image)
      let prevImg = null;
      let prev = cardEl.previousElementSibling;
      while (prev && !prevImg) {
        prevImg = prev.querySelector && prev.querySelector('img');
        prev = prev.previousElementSibling;
      }
      if (prevImg) img = prevImg.cloneNode(true);
    }
    // Tag (optional)
    const tag = cardEl.querySelector('.tag');
    // Heading (h3 or h4)
    let heading = cardEl.querySelector('h3, .h2-heading, .h4-heading');
    // Description (p)
    let desc = cardEl.querySelector('p');
    // Compose text cell
    const textCell = document.createElement('div');
    if (tag) {
      const tagSpan = document.createElement('span');
      tagSpan.append(tag.textContent);
      tagSpan.style.display = 'inline-block';
      tagSpan.style.fontSize = '0.75em';
      tagSpan.style.fontWeight = 'bold';
      tagSpan.style.marginBottom = '0.25em';
      textCell.append(tagSpan);
      textCell.append(document.createElement('br'));
    }
    if (heading) {
      textCell.append(heading.cloneNode(true));
    }
    if (desc) {
      textCell.append(desc.cloneNode(true));
    }
    return [img, textCell];
  }

  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Collect all cards in DOM order (anchors only)
  const cards = Array.from(grid.querySelectorAll('a.utility-link-content-block'));

  // For text-only cards (no image), try to assign a fallback image from the previous card with an image
  let lastImg = null;
  const rows = cards.map((card) => {
    let img = card.querySelector('img');
    if (!img && lastImg) {
      img = lastImg.cloneNode(true);
    }
    if (img) lastImg = img;
    // Tag, heading, desc
    const tag = card.querySelector('.tag');
    let heading = card.querySelector('h3, .h2-heading, .h4-heading');
    let desc = card.querySelector('p');
    const textCell = document.createElement('div');
    if (tag) {
      const tagSpan = document.createElement('span');
      tagSpan.append(tag.textContent);
      tagSpan.style.display = 'inline-block';
      tagSpan.style.fontSize = '0.75em';
      tagSpan.style.fontWeight = 'bold';
      tagSpan.style.marginBottom = '0.25em';
      textCell.append(tagSpan);
      textCell.append(document.createElement('br'));
    }
    if (heading) {
      textCell.append(heading.cloneNode(true));
    }
    if (desc) {
      textCell.append(desc.cloneNode(true));
    }
    return [img, textCell];
  });

  // Only keep rows where the first cell (image/icon) is present
  const filteredRows = rows.filter(([img]) => img);

  // Build table rows
  const headerRow = ['Cards (cards37)'];
  const tableRows = [headerRow, ...filteredRows];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
