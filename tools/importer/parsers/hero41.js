/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero41)'];

  // 2. Background image row
  // Find the background image (img inside the first grid-layout > div)
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 0) {
    bgImg = gridDivs[0].querySelector('img');
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row: heading, paragraph, CTA
  // The second gridDiv contains the text content
  let contentCell = '';
  if (gridDivs.length > 1) {
    // Find the inner grid (contains h1, paragraph, button)
    const innerGrid = gridDivs[1].querySelector('.w-layout-grid');
    if (innerGrid) {
      // Heading
      const heading = innerGrid.querySelector('h1');
      // Paragraph
      const paragraph = innerGrid.querySelector('p');
      // CTA button (first link inside .button-group)
      let cta = null;
      const buttonGroup = innerGrid.querySelector('.button-group');
      if (buttonGroup) {
        cta = buttonGroup.querySelector('a');
      }
      // Compose content cell
      const content = [];
      if (heading) content.push(heading);
      if (paragraph) content.push(paragraph);
      if (cta) content.push(cta);
      if (content.length > 0) {
        contentCell = content;
      }
    }
  }
  const contentRow = [contentCell];

  // 4. Build table
  const rows = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 5. Replace original element
  element.replaceWith(table);
}
