/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each <a>
  function extractCard(cardEl) {
    // Find image (mandatory)
    const imgWrapper = cardEl.querySelector('.utility-aspect-2x3');
    const img = imgWrapper ? imgWrapper.querySelector('img') : null;

    // Find tag and date (optional)
    const metaDiv = cardEl.querySelector('.flex-horizontal');
    let tag = null;
    let date = null;
    if (metaDiv) {
      const tagDiv = metaDiv.querySelector('.tag');
      if (tagDiv) tag = tagDiv;
      const dateDiv = metaDiv.querySelector('.paragraph-sm');
      if (dateDiv) date = dateDiv;
    }

    // Find title (mandatory)
    const title = cardEl.querySelector('h3');

    // Compose text cell
    const textCellContent = [];
    if (tag || date) {
      const metaRow = document.createElement('div');
      metaRow.style.display = 'flex';
      metaRow.style.gap = '0.5em';
      if (tag) metaRow.appendChild(tag);
      if (date) metaRow.appendChild(date);
      textCellContent.push(metaRow);
    }
    if (title) textCellContent.push(title);

    return [img, textCellContent];
  }

  // Get all cards
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Build table rows
  const headerRow = ['Cards (cards12)'];
  const rows = cards.map(cardEl => extractCard(cardEl));

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace element
  element.replaceWith(table);
}
