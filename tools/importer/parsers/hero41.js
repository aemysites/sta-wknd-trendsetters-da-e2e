/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero41)'];

  // 2. Background image row (row 2)
  // Find the image inside the first grid-layout div
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid');
  if (gridDivs.length > 0) {
    const firstGrid = gridDivs[0];
    // The image is inside the first child of the grid
    const firstChild = firstGrid.children[0];
    if (firstChild) {
      bgImg = firstChild.querySelector('img');
    }
  }
  // Defensive: If not found, set to empty string
  const bgImgCell = bgImg ? bgImg : '';

  // 3. Content row (row 3)
  // Find the container with the text content
  let contentCell = '';
  if (gridDivs.length > 0) {
    // The text content is in the second child of the grid
    const secondChild = gridDivs[0].children[1];
    if (secondChild) {
      // The actual content is inside an inner grid-layout
      const innerGrid = secondChild.querySelector('.grid-layout');
      if (innerGrid) {
        // We'll collect the heading, paragraph, and CTA
        const heading = innerGrid.querySelector('h1');
        const flexVertical = innerGrid.querySelector('.flex-vertical');
        let subheading = '';
        let cta = '';
        if (flexVertical) {
          const para = flexVertical.querySelector('p');
          if (para) subheading = para;
          const buttonGroup = flexVertical.querySelector('.button-group');
          if (buttonGroup) {
            const link = buttonGroup.querySelector('a');
            if (link) cta = link;
          }
        }
        // Compose the content cell as an array of elements (skip empty)
        const contentArr = [];
        if (heading) contentArr.push(heading);
        if (subheading) contentArr.push(subheading);
        if (cta) contentArr.push(cta);
        contentCell = contentArr.length > 0 ? contentArr : '';
      }
    }
  }

  const tableCells = [
    headerRow,
    [bgImgCell],
    [contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
