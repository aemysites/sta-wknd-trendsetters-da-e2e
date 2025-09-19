/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract text from a tag element (e.g., <div class="tag"><div>Sunny</div></div>)
  function extractTagText(tagEl) {
    if (!tagEl) return '';
    const innerDiv = tagEl.querySelector('div');
    return innerDiv ? innerDiv.textContent.trim() : tagEl.textContent.trim();
  }

  // Helper to extract CTA text ("Read") and wrap in a link
  function extractCTA(cardRoot, href) {
    // Find the CTA element ("Read")
    const ctaEl = Array.from(cardRoot.querySelectorAll('div')).find(div => div.textContent.trim() === 'Read');
    if (ctaEl && href) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = ctaEl.textContent.trim();
      return link;
    }
    return null;
  }

  // Get all card anchor elements (each card is an <a> inside the grid)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Build header row
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // For each card, build a row: [image, text content]
  cardLinks.forEach((cardLink) => {
    // Find image
    const img = cardLink.querySelector('img');

    // Find card content container (the inner grid div)
    const cardContentGrid = cardLink.querySelector('div.w-layout-grid');
    // Defensive: fallback to cardLink if not found
    const cardContent = cardContentGrid || cardLink;

    // Find tag and read time
    const tagRow = cardContent.querySelector('.flex-horizontal');
    let tagText = '', readTime = '';
    if (tagRow) {
      const tagEl = tagRow.querySelector('.tag');
      tagText = extractTagText(tagEl);
      const readTimeEl = tagRow.querySelector('.paragraph-sm');
      readTime = readTimeEl ? readTimeEl.textContent.trim() : '';
    }

    // Find title (h3)
    const titleEl = cardContent.querySelector('h3');
    // Find description (p)
    const descEl = cardContent.querySelector('p');
    // Find CTA ("Read")
    const ctaLink = extractCTA(cardContent, cardLink.getAttribute('href'));

    // Build text content cell
    const textCellContent = [];
    // Tag and read time (optional, above title)
    if (tagText || readTime) {
      const metaDiv = document.createElement('div');
      if (tagText) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tagText;
        metaDiv.appendChild(tagSpan);
      }
      if (readTime) {
        if (tagText) metaDiv.appendChild(document.createTextNode(' · '));
        const timeSpan = document.createElement('span');
        timeSpan.textContent = readTime;
        metaDiv.appendChild(timeSpan);
      }
      textCellContent.push(metaDiv);
    }
    // Title
    if (titleEl) textCellContent.push(titleEl);
    // Description
    if (descEl) textCellContent.push(descEl);
    // CTA
    if (ctaLink) textCellContent.push(ctaLink);

    // Add row: [image, text content]
    rows.push([
      img,
      textCellContent
    ]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
