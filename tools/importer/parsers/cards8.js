/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.classList.contains('grid-layout')) return;

  const headerRow = ['Cards (cards8)'];
  const rows = [headerRow];

  // Get all immediate children (cards)
  const cardDivs = element.querySelectorAll(':scope > div.utility-aspect-1x1');

  cardDivs.forEach(cardDiv => {
    const img = cardDiv.querySelector('img');
    if (!img) return;

    // Prepare the image cell
    const imageCell = img;

    // Prepare the text cell
    // Use alt text as heading if possible
    let textCell;
    const altText = img.getAttribute('alt');
    if (altText) {
      // Use the first phrase (before any parenthesis or dash) as heading, rest as description
      let heading = altText;
      let description = '';
      const split = altText.match(/^(.*?)\s*\((.*?)\)|^(.*?)(?:-|:)/);
      if (split) {
        heading = split[1] || split[3] || altText;
        description = altText.replace(heading, '').trim();
      }
      const frag = document.createDocumentFragment();
      const h = document.createElement('h3');
      h.textContent = heading.trim();
      frag.appendChild(h);
      if (description) {
        const p = document.createElement('p');
        p.textContent = description;
        frag.appendChild(p);
      }
      textCell = frag;
    } else {
      textCell = document.createElement('p');
      textCell.textContent = '';
    }

    rows.push([imageCell, textCell]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
