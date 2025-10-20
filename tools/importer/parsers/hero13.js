/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero13)'];

  // 2. Background image row
  let backgroundImg = '';
  const topDivs = Array.from(element.querySelectorAll(':scope > div'));
  if (topDivs.length > 0) {
    const bgImg = topDivs[0].querySelector('img');
    if (bgImg) backgroundImg = bgImg.cloneNode(true);
  }
  const backgroundRow = [backgroundImg];

  // 3. Content row (headline, list, CTA, secondary image)
  let contentCell = '';
  if (topDivs.length > 1) {
    const card = topDivs[1].querySelector('.card');
    if (card) {
      const grid = card.querySelector('.grid-layout');
      if (grid) {
        const gridChildren = Array.from(grid.children);
        const frag = document.createElement('div');
        // Secondary image (concert crowd)
        if (gridChildren.length > 0) {
          const secImg = gridChildren[0].querySelector('img');
          if (secImg) frag.appendChild(secImg.cloneNode(true));
        }
        // Headline, list items, CTA
        if (gridChildren.length > 1) {
          const textCol = gridChildren[1];
          // Headline
          const headline = textCol.querySelector('h1, h2, h3, h4, h5, h6');
          if (headline) frag.appendChild(headline.cloneNode(true));
          // List items: all .flex-horizontal blocks
          const flexGroups = Array.from(textCol.querySelectorAll('.flex-horizontal'));
          flexGroups.forEach(flex => {
            // Include icon and paragraph together
            const icon = flex.querySelector('.icon-small');
            const p = flex.querySelector('p');
            const rowDiv = document.createElement('div');
            if (icon) rowDiv.appendChild(icon.cloneNode(true));
            if (p) rowDiv.appendChild(p.cloneNode(true));
            frag.appendChild(rowDiv);
          });
          // CTA button
          const cta = textCol.querySelector('a.button, button');
          if (cta) frag.appendChild(cta.cloneNode(true));
        }
        contentCell = frag;
      }
    }
  }
  // Ensure all text content from the card is included if previous logic fails
  if (!contentCell && topDivs.length > 1) {
    const cardBody = topDivs[1].querySelector('.card-body');
    if (cardBody) contentCell = cardBody.cloneNode(true);
  }
  if (!contentCell) contentCell = '';
  const contentRow = [contentCell];

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
