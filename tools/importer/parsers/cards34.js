/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block: 2 columns, multiple rows, first row is header
  // Each card: image in first cell, text content (tag, read time, title, description, CTA) in second cell

  // Header row as required
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Find all card anchor elements (each card is an <a> tag)
  const cardAnchors = element.querySelectorAll('a.utility-link-content-block');

  cardAnchors.forEach((card) => {
    // Image: first img inside the card
    const img = card.querySelector('img');

    // Text content container (the div after the image)
    const textContainer = img.nextElementSibling;
    if (!img || !textContainer) return; // Defensive: skip if missing

    // Tag and read time (first horizontal flex row)
    const tagRow = textContainer.querySelector('.flex-horizontal');
    let tag = null;
    let readTime = null;
    if (tagRow) {
      tag = tagRow.querySelector('.tag');
      readTime = tagRow.querySelector('.paragraph-sm');
    }

    // Title (h3)
    const title = textContainer.querySelector('h3');
    // Description (p)
    const description = textContainer.querySelector('p');
    // CTA ("Read" div)
    const ctaDiv = Array.from(textContainer.querySelectorAll('div')).find(div => div.textContent.trim() === 'Read');

    // Compose text cell content
    const textCellContent = [];
    if (tag || readTime) {
      const tagReadRow = document.createElement('div');
      tagReadRow.style.display = 'flex';
      tagReadRow.style.gap = '0.5em';
      if (tag) tagReadRow.appendChild(tag);
      if (readTime) tagReadRow.appendChild(readTime);
      textCellContent.push(tagReadRow);
    }
    if (title) textCellContent.push(title);
    if (description) textCellContent.push(description);
    if (ctaDiv) textCellContent.push(ctaDiv);

    rows.push([img, textCellContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
