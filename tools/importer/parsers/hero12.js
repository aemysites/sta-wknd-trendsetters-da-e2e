/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero12)'];

  // Row 2: Background image (main background image)
  let backgroundImgCell = '';
  const bgDiv = element.querySelector(':scope > div:first-of-type');
  if (bgDiv) {
    const bgImg = bgDiv.querySelector('img');
    if (bgImg) backgroundImgCell = bgImg.cloneNode(true);
  }

  // Row 3: Content (headline, subheading, CTA, etc)
  let contentCell = '';
  const contentDiv = element.querySelector(':scope > div:nth-of-type(2)');
  if (contentDiv) {
    // Find the card body
    const cardBody = contentDiv.querySelector('.card-body');
    if (cardBody) {
      // Get the grid with the inner content
      const grid = cardBody.querySelector('.grid-layout');
      if (grid) {
        // The left image (concert crowd)
        const crowdImg = grid.querySelector('img');
        // The right column (text)
        const gridChildren = Array.from(grid.children);
        if (gridChildren.length > 1) {
          const textCol = gridChildren[1];
          // Compose a div for all text content
          const textDiv = document.createElement('div');
          // Heading
          const heading = textCol.querySelector('h2');
          if (heading) textDiv.appendChild(heading.cloneNode(true));
          // List items
          const flexVert = textCol.querySelector('.flex-vertical');
          if (flexVert) {
            const rows = flexVert.querySelectorAll('.flex-horizontal');
            rows.forEach(row => {
              const p = row.querySelector('p');
              if (p) textDiv.appendChild(p.cloneNode(true));
            });
          }
          // CTA button
          const button = textCol.querySelector('.button-group .button');
          if (button) textDiv.appendChild(button.cloneNode(true));
          // Compose cell: left image + text content
          const cellDiv = document.createElement('div');
          if (crowdImg) cellDiv.appendChild(crowdImg.cloneNode(true));
          if (textDiv.hasChildNodes()) cellDiv.appendChild(textDiv);
          // Only set contentCell if there is actual content
          if (cellDiv.hasChildNodes()) {
            contentCell = cellDiv;
          } else {
            contentCell = '';
          }
        }
      }
    }
  }

  // Compose the table (always 3 rows: header, image, content)
  const cells = [headerRow, [backgroundImgCell], [contentCell]];

  // Remove unnecessary empty row at the end if contentCell is empty
  if (!contentCell) cells.pop();

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
