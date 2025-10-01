/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero41)'];

  // 2. Find the background image (row 2)
  // The image is inside the first grid cell (first child div)
  const gridDivs = element.querySelectorAll(':scope > div > div');
  let bgImg = null;
  if (gridDivs.length > 0) {
    bgImg = gridDivs[0].querySelector('img');
  }
  // Defensive: If not found, leave cell empty
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Find the hero content (row 3)
  // The text and CTA are inside the second grid cell
  let contentCell = [];
  if (gridDivs.length > 1) {
    // The text grid is inside this cell
    const innerGrid = gridDivs[1].querySelector('.w-layout-grid');
    if (innerGrid) {
      // Heading
      const heading = innerGrid.querySelector('h1');
      if (heading) contentCell.push(heading);
      // Paragraph
      const paragraph = innerGrid.querySelector('p');
      if (paragraph) contentCell.push(paragraph);
      // CTA button (link)
      const button = innerGrid.querySelector('a');
      if (button) contentCell.push(button);
    }
  }
  // Defensive: If nothing found, leave cell empty string
  const contentRow = [contentCell.length ? contentCell : ''];

  // 4. Compose table rows
  const rows = [headerRow, imageRow, contentRow];

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
