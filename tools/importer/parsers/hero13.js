/* global WebImporter */
export default function parse(element, { document }) {
  // --- HEADER ROW ---
  const headerRow = ['Hero (hero13)'];

  // --- BACKGROUND IMAGE ROW ---
  // Find the background image: .cover-image.utility-position-absolute
  const backgroundImg = element.querySelector('img.cover-image.utility-position-absolute');
  const backgroundRow = [backgroundImg ? backgroundImg : ''];

  // --- CONTENT ROW ---
  // Find the main card body (contains headline, subhead, CTA)
  let contentCell = '';
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    // Only extract the text/button column (not the inner image)
    const grid = cardBody.querySelector('.grid-layout');
    let textCol = null;
    if (grid) {
      // Find all divs inside grid-layout
      const gridDivs = Array.from(grid.children).filter((c) => c.tagName === 'DIV');
      // The column with the h2 is the text column
      textCol = gridDivs.find(div => div.querySelector('h2'));
    }
    if (textCol) {
      contentCell = textCol;
    } else {
      // fallback: use the cardBody itself
      contentCell = cardBody;
    }
  }
  const contentRow = [contentCell];

  // --- BUILD TABLE ---
  const cells = [
    headerRow,
    backgroundRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
