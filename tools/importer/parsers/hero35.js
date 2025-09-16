/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: must match block name exactly
  const headerRow = ['Hero (hero35)'];

  // 2. Background image row: none present in this HTML
  const bgImageRow = [''];

  // 3. Content row: gather heading, subheading, CTA (all in one cell)
  const grid = element.querySelector('.grid-layout');
  let contentEls = [];

  if (grid) {
    // Left block: heading and subheading
    const leftBlock = grid.children[0];
    if (leftBlock) {
      const heading = leftBlock.querySelector('h2');
      if (heading) contentEls.push(heading);
      const subheading = leftBlock.querySelector('p');
      if (subheading) contentEls.push(subheading);
    }
    // Right block: CTA button
    const rightBlock = grid.children[1];
    if (rightBlock && rightBlock.tagName === 'A') {
      contentEls.push(rightBlock);
    }
  }

  // Compose table rows
  const cells = [
    headerRow,
    bgImageRow,
    [contentEls], // all content nodes in a single cell
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
