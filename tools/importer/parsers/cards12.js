/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct card links
  const cardLinks = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block'));

  // Table header as per block spec
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  cardLinks.forEach((card) => {
    // Image: reference existing element
    const imgContainer = card.querySelector('.utility-aspect-2x3');
    const img = imgContainer ? imgContainer.querySelector('img') : null;

    // Tag and Date
    const metaRow = card.querySelector('.flex-horizontal');
    let metaText = '';
    if (metaRow) {
      const tag = metaRow.querySelector('.tag');
      const date = metaRow.querySelector('.paragraph-sm');
      if (tag && date) {
        metaText = `${tag.textContent.trim()} | ${date.textContent.trim()}`;
      } else if (tag) {
        metaText = tag.textContent.trim();
      } else if (date) {
        metaText = date.textContent.trim();
      }
    }

    // Heading
    const heading = card.querySelector('h3');

    // Compose text cell
    const textCell = document.createElement('div');
    if (metaText) {
      const metaDiv = document.createElement('div');
      metaDiv.textContent = metaText;
      metaDiv.style.fontSize = '0.9em';
      metaDiv.style.marginBottom = '0.5em';
      textCell.appendChild(metaDiv);
    }
    if (heading) {
      const headingClone = document.createElement('h3');
      headingClone.textContent = heading.textContent;
      textCell.appendChild(headingClone);
    }
    // No description in source, so nothing else to add
    // Optionally, add CTA if desired by block spec (not present visually)
    // if (card.href) {
    //   const ctaLink = document.createElement('a');
    //   ctaLink.href = card.href;
    //   ctaLink.textContent = 'Read more';
    //   ctaLink.style.display = 'block';
    //   ctaLink.style.marginTop = '0.5em';
    //   textCell.appendChild(ctaLink);
    // }

    rows.push([
      img ? img : '',
      textCell
    ]);
  });

  // Create table and replace
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
