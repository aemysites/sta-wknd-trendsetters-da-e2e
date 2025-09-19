/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all card anchor elements (each card is an <a>)
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach((card) => {
    // Image cell: find the first img inside the card
    const imageWrapper = card.querySelector(':scope > div');
    const img = imageWrapper ? imageWrapper.querySelector('img') : null;

    // Text cell: find the content wrapper
    const contentWrapper = card.querySelector('.utility-padding-all-1rem');

    // Tag (optional, displayed above title)
    let tag = '';
    const tagDiv = contentWrapper && contentWrapper.querySelector('.tag-group .tag');
    if (tagDiv && tagDiv.textContent) {
      tag = tagDiv.textContent.trim();
    }

    // Title (h3)
    let title = '';
    const titleEl = contentWrapper && contentWrapper.querySelector('h3');
    if (titleEl && titleEl.textContent) {
      title = titleEl.textContent.trim();
    }

    // Description (p)
    let desc = '';
    const descEl = contentWrapper && contentWrapper.querySelector('p');
    if (descEl && descEl.textContent) {
      desc = descEl.textContent.trim();
    }

    // Compose text cell
    const textCell = document.createElement('div');
    textCell.style.display = 'flex';
    textCell.style.flexDirection = 'column';

    if (tag) {
      const tagSpan = document.createElement('span');
      tagSpan.textContent = tag;
      tagSpan.style.fontSize = '0.85em';
      tagSpan.style.fontWeight = 'bold';
      tagSpan.style.textTransform = 'uppercase';
      tagSpan.style.marginBottom = '0.5em';
      textCell.appendChild(tagSpan);
    }
    if (title) {
      const heading = document.createElement('strong');
      heading.textContent = title;
      heading.style.display = 'block';
      heading.style.marginBottom = '0.25em';
      textCell.appendChild(heading);
    }
    if (desc) {
      const descP = document.createElement('p');
      descP.textContent = desc;
      textCell.appendChild(descP);
    }

    // Compose card row: [image, text]
    rows.push([
      img || '',
      textCell
    ]);
  });

  // Create table and replace element
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
