/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from each <a> card element
  function extractCardContent(cardEl) {
    // Find image (mandatory)
    const imgWrapper = cardEl.querySelector('.utility-aspect-2x3');
    let img = null;
    if (imgWrapper) {
      img = imgWrapper.querySelector('img');
    }

    // Find tag and date (optional, shown above title)
    const metaRow = cardEl.querySelector('.flex-horizontal');
    let metaContent = [];
    if (metaRow) {
      // Tag
      const tag = metaRow.querySelector('.tag');
      if (tag) metaContent.push(tag);
      // Date
      const date = metaRow.querySelector('.paragraph-sm');
      if (date) metaContent.push(date);
    }

    // Find title (mandatory)
    const title = cardEl.querySelector('h3');

    // Compose text cell
    const textCellContent = [];
    if (metaContent.length) {
      // Wrap meta in a div for grouping
      const metaDiv = document.createElement('div');
      metaDiv.append(...metaContent);
      textCellContent.push(metaDiv);
    }
    if (title) textCellContent.push(title);

    // No description or CTA in this source, so only meta + title

    return [img, textCellContent];
  }

  // Get all card links (each card is an <a>)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Build table rows
  const headerRow = ['Cards (cards8)'];
  const rows = [headerRow];

  cards.forEach(cardEl => {
    const [img, textCellContent] = extractCardContent(cardEl);
    // Defensive: only add if image and title exist
    if (img && textCellContent.length) {
      rows.push([
        img,
        textCellContent
      ]);
    }
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
