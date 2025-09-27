/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each anchor
  function extractCardInfo(cardEl) {
    // Find the image (mandatory)
    const img = cardEl.querySelector('img');
    // Find the text container (the div after the image)
    const textContainer = cardEl.querySelector('div:not(.w-layout-grid)');
    let title, desc, cta, meta;
    if (textContainer) {
      // Title (h3)
      title = textContainer.querySelector('h3');
      // Description (p)
      desc = textContainer.querySelector('p');
      // CTA (last div, contains 'Read')
      const divs = textContainer.querySelectorAll('div');
      if (divs.length > 0) {
        cta = Array.from(divs).find(d => d.textContent.trim().toLowerCase() === 'read');
      }
      // Meta info (tag + read time)
      const metaRow = textContainer.querySelector('.flex-horizontal');
      if (metaRow) {
        meta = metaRow.cloneNode(true); // Defensive: clone so we don't move it
      }
    }
    // Compose the text cell
    const textCellContent = [];
    if (meta) textCellContent.push(meta);
    if (title) textCellContent.push(title);
    if (desc) textCellContent.push(desc);
    if (cta) textCellContent.push(cta);
    return [img, textCellContent];
  }

  // Get all immediate child anchors (cards)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Build the table rows
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  cards.forEach(cardEl => {
    const [img, textContent] = extractCardInfo(cardEl);
    rows.push([img, textContent]);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
