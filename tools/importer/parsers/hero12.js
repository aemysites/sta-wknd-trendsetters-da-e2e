/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero12)'];

  // 2. Background image row (first image in the first grid cell)
  let backgroundImg = null;
  const gridDivs = element.querySelectorAll(':scope > div');
  if (gridDivs.length > 0) {
    backgroundImg = gridDivs[0].querySelector('img');
  }
  const backgroundRow = [backgroundImg ? backgroundImg : ''];

  // 3. Content row (headline, subheading, CTA)
  let contentCell = [];
  if (gridDivs.length > 1) {
    const cardBody = gridDivs[1].querySelector('.card-body');
    if (cardBody) {
      const innerGrid = cardBody.querySelector('.grid-layout');
      if (innerGrid) {
        // Heading
        const heading = innerGrid.querySelector('h2');
        if (heading) contentCell.push(heading);
        // Subheadings and list items (paragraphs)
        const flexVertical = innerGrid.querySelector('.flex-vertical');
        if (flexVertical) {
          flexVertical.querySelectorAll('p').forEach(p => contentCell.push(p));
          // CTA button
          const button = flexVertical.querySelector('.button-group a');
          if (button) contentCell.push(button);
        }
      }
    }
  }
  // Only add the third row if there is actual content
  const cells = [headerRow, backgroundRow];
  if (contentCell.length) {
    cells.push([contentCell]);
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
