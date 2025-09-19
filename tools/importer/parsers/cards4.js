/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from an <a> element
  function extractCardContent(cardLink) {
    // Find the image (first .utility-aspect-2x3)
    const imageWrapper = cardLink.querySelector('.utility-aspect-2x3');
    let image = null;
    if (imageWrapper) {
      image = imageWrapper.querySelector('img');
    }

    // Find the tag and date (second .flex-horizontal)
    const metaRow = cardLink.querySelector('.flex-horizontal');
    let tag = '', date = '';
    if (metaRow) {
      const tagDiv = metaRow.querySelector('.tag');
      if (tagDiv) tag = tagDiv.textContent.trim();
      const dateDiv = metaRow.querySelector('.paragraph-sm');
      if (dateDiv) date = dateDiv.textContent.trim();
    }

    // Find the title (h3)
    const titleEl = cardLink.querySelector('h3');
    let title = '';
    if (titleEl) title = titleEl.textContent.trim();

    // Compose the text cell: tag/date (if present) + title
    const textCell = document.createElement('div');
    if (tag || date) {
      const meta = document.createElement('div');
      if (tag) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tag;
        meta.appendChild(tagSpan);
      }
      if (tag && date) {
        meta.appendChild(document.createTextNode(' '));
      }
      if (date) {
        const dateSpan = document.createElement('span');
        dateSpan.textContent = date;
        meta.appendChild(dateSpan);
      }
      textCell.appendChild(meta);
    }
    if (title) {
      const heading = document.createElement('strong');
      heading.textContent = title;
      textCell.appendChild(heading);
    }
    return [image, textCell];
  }

  // Build the table rows
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Get all card links (direct children)
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');
  cards.forEach(cardLink => {
    const [image, textCell] = extractCardContent(cardLink);
    rows.push([image, textCell]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
