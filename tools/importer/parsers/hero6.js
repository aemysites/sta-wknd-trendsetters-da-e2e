/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: find direct children only
  function getDirectChild(parent, selector) {
    return Array.from(parent.children).find(el => el.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row
  let backgroundImg = null;
  const gridLayout = element.querySelector('.w-layout-grid.grid-layout');
  if (gridLayout) {
    // Find the first direct child div with an img
    const imgDiv = getDirectChild(gridLayout, 'div');
    if (imgDiv) {
      backgroundImg = imgDiv.querySelector('img');
    }
  }
  const imgRow = [backgroundImg ? backgroundImg : ''];

  // 3. Content row (title, subheading, CTA)
  let contentCell = [];
  if (gridLayout) {
    // Find the second direct child div (the content container)
    const containerDivs = Array.from(gridLayout.children).filter(el => el.tagName === 'DIV');
    if (containerDivs.length > 1) {
      const contentGrid = containerDivs[1].querySelector('.grid-layout');
      if (contentGrid) {
        const card = contentGrid.querySelector('.card');
        if (card) {
          // Heading
          const heading = card.querySelector('h1');
          if (heading) contentCell.push(heading);
          // Subheading
          const subheading = card.querySelector('p');
          if (subheading) contentCell.push(subheading);
          // CTA buttons
          const buttonGroup = card.querySelector('.button-group');
          if (buttonGroup) {
            const buttons = Array.from(buttonGroup.querySelectorAll('a'));
            if (buttons.length) contentCell.push(...buttons);
          }
        }
      }
    }
  }
  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose table rows
  const cells = [
    headerRow,
    imgRow,
    contentRow,
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
