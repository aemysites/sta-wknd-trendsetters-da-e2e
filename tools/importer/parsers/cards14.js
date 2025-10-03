/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each anchor
  function extractCardInfo(cardEl) {
    // Find image (mandatory)
    const imgWrapper = cardEl.querySelector('div.utility-aspect-2x3');
    let img = imgWrapper ? imgWrapper.querySelector('img') : null;

    // Find tag and date (optional)
    const metaRow = cardEl.querySelector('.flex-horizontal');
    let tag = null;
    let date = null;
    if (metaRow) {
      const tagEl = metaRow.querySelector('.tag');
      if (tagEl) tag = tagEl;
      const dateEl = metaRow.querySelector('.paragraph-sm');
      if (dateEl) date = dateEl;
    }

    // Find heading (mandatory)
    const heading = cardEl.querySelector('h3');

    // Compose text cell content
    const textContent = [];
    if (tag || date) {
      const metaDiv = document.createElement('div');
      if (tag) metaDiv.appendChild(tag);
      if (date) metaDiv.appendChild(date);
      textContent.push(metaDiv);
    }
    if (heading) textContent.push(heading);

    return [img, textContent];
  }

  // Get all card anchors
  const cardLinks = element.querySelectorAll(':scope > a.utility-link-content-block');

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards14)']);
  // Card rows
  cardLinks.forEach((cardEl) => {
    const [img, textContent] = extractCardInfo(cardEl);
    rows.push([
      img || '',
      textContent.length === 1 ? textContent[0] : textContent
    ]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
