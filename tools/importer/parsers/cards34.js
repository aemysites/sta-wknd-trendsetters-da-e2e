/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each <a> card
  function extractCardInfo(card) {
    // Find image (mandatory)
    const img = card.querySelector('img');

    // Find content container (the div after the image)
    const contentDiv = img.nextElementSibling;
    if (!contentDiv) return [img, ''];

    // Tag and read time (optional)
    const tagRow = contentDiv.querySelector('.flex-horizontal');
    let tag = '', readTime = '';
    if (tagRow) {
      const tagDiv = tagRow.querySelector('.tag');
      if (tagDiv) {
        const tagTextDiv = tagDiv.querySelector('div');
        if (tagTextDiv) tag = tagTextDiv.textContent.trim();
      }
      const timeDiv = tagRow.querySelector('.paragraph-sm');
      if (timeDiv) readTime = timeDiv.textContent.trim();
    }

    // Title (mandatory)
    const heading = contentDiv.querySelector('h3');
    // Description (optional)
    const desc = contentDiv.querySelector('p');
    // CTA (optional, always 'Read' here)
    // Find last child div with text 'Read'
    let cta = null;
    const ctaDivs = Array.from(contentDiv.querySelectorAll('div'));
    for (const d of ctaDivs) {
      if (d.textContent.trim().toLowerCase() === 'read') {
        cta = d;
        break;
      }
    }
    // Compose text cell
    const textCellContent = [];
    // Tag and read time row (optional)
    if (tag || readTime) {
      const tagRowFrag = document.createElement('div');
      if (tag) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tag;
        tagSpan.style.fontWeight = 'bold';
        tagRowFrag.appendChild(tagSpan);
      }
      if (readTime) {
        const timeSpan = document.createElement('span');
        timeSpan.textContent = (tag ? ' ' : '') + readTime;
        tagRowFrag.appendChild(timeSpan);
      }
      textCellContent.push(tagRowFrag);
    }
    // Heading
    if (heading) textCellContent.push(heading);
    // Description
    if (desc) textCellContent.push(desc);
    // CTA
    if (cta) textCellContent.push(cta);

    return [img, textCellContent];
  }

  // Get all direct child <a> elements (each card)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Table header
  const headerRow = ['Cards (cards34)'];
  const tableRows = [headerRow];

  // Each card becomes a row: [image, text content]
  cards.forEach(card => {
    tableRows.push(extractCardInfo(card));
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace original element
  element.replaceWith(block);
}
