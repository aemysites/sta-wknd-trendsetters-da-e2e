/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get immediate children of the grid layout
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const gridChildren = grid.querySelectorAll(':scope > div');

  // Row 1: Block name header
  const headerRow = ['Hero (hero41)'];

  // Row 2: Background image (optional)
  let bgImg = null;
  if (gridChildren.length > 0) {
    // Look for an img element inside the first grid child
    bgImg = gridChildren[0].querySelector('img');
  }
  const imageRow = [bgImg ? bgImg : ''];

  // Row 3: Headline, subheading, CTA (all optional)
  let contentCell = [];
  if (gridChildren.length > 1) {
    // The second grid child contains the text and CTA
    const textGrid = gridChildren[1].querySelector('.w-layout-grid');
    if (textGrid) {
      // Headline
      const headline = textGrid.querySelector('h1');
      if (headline) contentCell.push(headline);
      // Subheading & paragraph
      const flexVertical = textGrid.querySelector('.flex-vertical');
      if (flexVertical) {
        // Paragraph
        const paragraph = flexVertical.querySelector('p');
        if (paragraph) contentCell.push(paragraph);
        // CTA button
        const buttonGroup = flexVertical.querySelector('.button-group');
        if (buttonGroup) {
          const cta = buttonGroup.querySelector('a');
          if (cta) contentCell.push(cta);
        }
      }
    }
  }
  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
