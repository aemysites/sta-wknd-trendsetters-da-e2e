/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each link
  function extractCard(link) {
    // Find image (mandatory)
    const imgContainer = link.querySelector('.utility-aspect-2x3');
    const img = imgContainer ? imgContainer.querySelector('img') : null;

    // Find tag and date
    const metaRow = link.querySelector('.flex-horizontal');
    let tag = null, date = null;
    if (metaRow) {
      const metaChildren = metaRow.querySelectorAll(':scope > div');
      if (metaChildren.length > 0) tag = metaChildren[0];
      if (metaChildren.length > 1) date = metaChildren[1];
    }

    // Find title (mandatory)
    const title = link.querySelector('h3');

    // Compose text cell: tag + date + title
    const textCell = document.createElement('div');
    textCell.style.display = 'flex';
    textCell.style.flexDirection = 'column';
    if (tag) {
      const tagWrap = document.createElement('div');
      tagWrap.appendChild(tag);
      textCell.appendChild(tagWrap);
    }
    if (date) {
      const dateWrap = document.createElement('div');
      dateWrap.appendChild(date);
      textCell.appendChild(dateWrap);
    }
    if (title) {
      textCell.appendChild(title);
    }

    return [img, textCell];
  }

  // Get all card links (immediate children)
  const cardLinks = element.querySelectorAll(':scope > a');

  // Build table rows
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  cardLinks.forEach((link) => {
    const cardRow = extractCard(link);
    rows.push(cardRow);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace element
  element.replaceWith(block);
}
