/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row (row 2)
  // Find the image inside the first grid cell
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  if (gridDivs.length > 0) {
    // The first child contains the image
    bgImg = gridDivs[0].querySelector('img');
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (row 3)
  // Find the content card (title, subheading, CTAs)
  let contentCell = [];
  if (gridDivs.length > 1) {
    // The second grid cell contains the card
    const card = gridDivs[1].querySelector('.card');
    if (card) {
      // We'll collect the heading, subheading, and buttons
      // Heading
      const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) contentCell.push(heading);
      // Subheading (paragraph)
      const subheading = card.querySelector('p');
      if (subheading) contentCell.push(subheading);
      // CTAs (links/buttons)
      const btnGroup = card.querySelector('.button-group');
      if (btnGroup) {
        // Collect all links inside button group
        const btns = Array.from(btnGroup.querySelectorAll('a'));
        if (btns.length) contentCell.push(...btns);
      }
    }
  }
  // If nothing found, set to empty string
  if (contentCell.length === 0) contentCell = '';
  const contentRow = [contentCell];

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
