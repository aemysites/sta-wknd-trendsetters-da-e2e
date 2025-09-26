/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // 1. Header row: always block name
  const headerRow = ['Hero (hero41)'];

  // 2. Background image row
  // Find the image element (background)
  let bgImg = null;
  // The image is inside the first grid cell
  const gridDivs = element.querySelectorAll(':scope > div > div');
  if (gridDivs.length > 0) {
    const firstGrid = gridDivs[0];
    bgImg = firstGrid.querySelector('img');
  }
  // Defensive: If not found, leave cell empty
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row: Title, Subheading, CTA
  // The content is inside the second grid cell
  let contentCell = document.createElement('div');
  if (gridDivs.length > 1) {
    const secondGrid = gridDivs[1];
    // Find the inner grid (holds h1, paragraph, button)
    const innerGrid = secondGrid.querySelector('.w-layout-grid');
    if (innerGrid) {
      // Gather heading
      const heading = innerGrid.querySelector('h1');
      if (heading) contentCell.appendChild(heading);
      // Gather paragraph and button
      const flexVertical = innerGrid.querySelector('.flex-vertical');
      if (flexVertical) {
        // Paragraph
        const paragraph = flexVertical.querySelector('p');
        if (paragraph) contentCell.appendChild(paragraph);
        // Button (CTA)
        const buttonGroup = flexVertical.querySelector('.button-group');
        if (buttonGroup) {
          const cta = buttonGroup.querySelector('a');
          if (cta) contentCell.appendChild(cta);
        }
      }
    }
  }
  const contentRow = [contentCell];

  // Build the table
  const cells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with block table
  element.replaceWith(block);
}
