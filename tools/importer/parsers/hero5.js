/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container (contains text and image)
  const grid = element.querySelector('.w-layout-grid.grid-layout.container');
  let textContentDiv = null;
  let imageEl = null;

  if (grid) {
    // The first child div inside the grid is the text content
    textContentDiv = grid.querySelector('div.section');
  }

  // The image is a direct child of the outer grid (not inside the text container)
  imageEl = element.querySelector('img');

  // Row 1: Block name (must match target block name exactly)
  const headerRow = ['Hero (hero5)'];

  // Row 2: Background image (reference the actual element, do not clone)
  const imageRow = [imageEl ? imageEl : ''];

  // Row 3: Title, subheading, paragraph, CTA (all text content)
  // Collect h2, paragraph, and button group (if present)
  let contentArr = [];
  if (textContentDiv) {
    const h2 = textContentDiv.querySelector('h2');
    if (h2) contentArr.push(h2);
    const richText = textContentDiv.querySelector('.rich-text, .w-richtext');
    if (richText) contentArr.push(richText);
    const buttonGroup = textContentDiv.querySelector('.button-group');
    if (buttonGroup) contentArr.push(buttonGroup);
  }
  const contentRow = [contentArr];

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
