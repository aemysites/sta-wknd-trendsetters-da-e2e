/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block guidelines
  const headerRow = ['Hero (hero6)'];

  // --- Extract background image (row 2) ---
  // Find the image inside the first grid cell
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  // Defensive: find the first image in the first grid cell
  if (gridDivs.length > 0) {
    bgImg = gridDivs[0].querySelector('img');
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // --- Extract content (row 3) ---
  // Find the card with heading, subheading, and buttons
  let contentCell = '';
  if (gridDivs.length > 1) {
    // The second grid cell contains the content
    const contentGrid = gridDivs[1].querySelector('.grid-layout');
    if (contentGrid) {
      // The card is inside this grid
      const card = contentGrid.querySelector('.card');
      if (card) {
        // We'll extract: heading, subheading, and buttons
        const parts = [];
        // Heading (h1)
        const h1 = card.querySelector('h1');
        if (h1) parts.push(h1);
        // Subheading (p.subheading)
        const subheading = card.querySelector('p.subheading');
        if (subheading) parts.push(subheading);
        // Button group (links)
        const btnGroup = card.querySelector('.button-group');
        if (btnGroup) {
          // Only keep the links
          const btns = Array.from(btnGroup.querySelectorAll('a'));
          if (btns.length > 0) {
            // Wrap in a div for layout
            const btnDiv = document.createElement('div');
            btns.forEach(btn => btnDiv.appendChild(btn));
            parts.push(btnDiv);
          }
        }
        // Compose the cell
        if (parts.length > 0) {
          contentCell = parts;
        }
      }
    }
  }
  const contentRow = [contentCell];

  // Compose table
  const rows = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}
