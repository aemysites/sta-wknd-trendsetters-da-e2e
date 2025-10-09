/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards8) block: 2 columns, multiple rows, first row is block name
  const headerRow = ['Cards (cards8)'];
  const rows = [headerRow];

  // Select all card anchors inside the grid container
  const cardSelector = 'a.utility-link-content-block';
  const cards = element.querySelectorAll(cardSelector);

  cards.forEach((card) => {
    // --- Image cell ---
    // Find the image inside the card
    const imageContainer = card.querySelector('.utility-aspect-2x3');
    let img = imageContainer ? imageContainer.querySelector('img') : null;
    // Defensive: If no image, leave cell empty
    const imageCell = img ? img : '';

    // --- Text cell ---
    // Tag and date row (horizontal)
    const metaRow = card.querySelector('.flex-horizontal');
    let tag = '', date = '';
    if (metaRow) {
      const tagElem = metaRow.querySelector('.tag');
      tag = tagElem ? tagElem.textContent.trim() : '';
      const dateElem = metaRow.querySelector('.paragraph-sm');
      date = dateElem ? dateElem.textContent.trim() : '';
    }
    // Title
    const titleElem = card.querySelector('h3, .h4-heading');
    const title = titleElem ? titleElem.textContent.trim() : '';

    // Compose text cell: Tag (badge), Date, Title
    const textCell = document.createElement('div');
    // Tag and date row
    if (tag || date) {
      const metaDiv = document.createElement('div');
      metaDiv.style.display = 'flex';
      metaDiv.style.gap = '0.5em';
      if (tag) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tag;
        tagSpan.className = 'tag';
        metaDiv.appendChild(tagSpan);
      }
      if (date) {
        const dateSpan = document.createElement('span');
        dateSpan.textContent = date;
        dateSpan.className = 'date';
        metaDiv.appendChild(dateSpan);
      }
      textCell.appendChild(metaDiv);
    }
    // Title
    if (title) {
      const heading = document.createElement('h3');
      heading.textContent = title;
      heading.className = 'h4-heading';
      textCell.appendChild(heading);
    }
    // If the card is a link, wrap the text cell in a link to preserve CTA
    if (card.href) {
      const link = document.createElement('a');
      link.href = card.href;
      link.appendChild(textCell);
      rows.push([imageCell, link]);
    } else {
      rows.push([imageCell, textCell]);
    }
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
