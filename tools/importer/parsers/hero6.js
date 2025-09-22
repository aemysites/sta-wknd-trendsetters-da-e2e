/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate child by class from a parent
  function getChildByClass(parent, className) {
    return Array.from(parent.children).find((el) => el.classList.contains(className));
  }

  // 1. Header row
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row
  // Find the image inside the header
  let bgImg = null;
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (grid) {
    // The first grid child contains the image
    const gridChildren = Array.from(grid.children);
    const bgImgContainer = gridChildren[0];
    if (bgImgContainer) {
      bgImg = bgImgContainer.querySelector('img');
    }
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (heading, subheading, CTAs)
  let contentCell = [];
  if (grid) {
    // The second grid child contains the text content
    const gridChildren = Array.from(grid.children);
    const contentContainer = gridChildren[1];
    if (contentContainer) {
      // The actual card with text is nested deeper
      const card = contentContainer.querySelector('.card');
      if (card) {
        // Extract heading, subheading, and button group
        const heading = card.querySelector('h1');
        const subheading = card.querySelector('p');
        const buttonGroup = card.querySelector('.button-group');
        // Gather all in order, filter out nulls
        contentCell = [
          ...(heading ? [heading] : []),
          ...(subheading ? [subheading] : []),
          ...(buttonGroup ? [buttonGroup] : [])
        ];
      }
    }
  }
  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose the table
  const cells = [
    headerRow,
    bgImgRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
