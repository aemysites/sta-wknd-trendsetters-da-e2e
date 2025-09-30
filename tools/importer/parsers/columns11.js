/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  function getDirectChildrenBySelector(parent, selector) {
    return Array.from(parent.children).filter((el) => el.matches(selector));
  }

  // Find the main grid containing the two main columns (headline/desc and intro)
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  if (!mainGrid) return;

  // First column: headline/eyebrow
  const firstCol = mainGrid.children[0];
  // Second column: description, author, button
  const secondCol = mainGrid.children[1];

  // Compose left column (headline)
  const leftColContent = [];
  if (firstCol) {
    // Eyebrow
    const eyebrow = firstCol.querySelector('.eyebrow');
    if (eyebrow) leftColContent.push(eyebrow);
    // Headline
    const headline = firstCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (headline) leftColContent.push(headline);
  }

  // Compose right column (desc, author, button)
  const rightColContent = [];
  if (secondCol) {
    // Description
    const desc = secondCol.querySelector('.rich-text');
    if (desc) rightColContent.push(desc);
    // Author block
    const authorGrid = secondCol.querySelector('.w-layout-grid.grid-layout');
    if (authorGrid) {
      // Only add the author info (not the button)
      const authorInfo = authorGrid.querySelector('.flex-horizontal.y-center');
      if (authorInfo) rightColContent.push(authorInfo);
      // Button
      const button = authorGrid.querySelector('a.button');
      if (button) rightColContent.push(button);
    }
  }

  // Find the lower grid with two images
  const lowerGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let lowerLeftImg = null;
  let lowerRightImg = null;
  if (lowerGrid) {
    const imgs = lowerGrid.querySelectorAll('img');
    if (imgs[0]) lowerLeftImg = imgs[0];
    if (imgs[1]) lowerRightImg = imgs[1];
  }

  // Compose table rows
  const headerRow = ['Columns block (columns11)'];
  const contentRow = [
    [ ...leftColContent ],
    [ ...rightColContent ]
  ];
  const imagesRow = [
    lowerLeftImg ? [lowerLeftImg] : '',
    lowerRightImg ? [lowerRightImg] : ''
  ];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
    imagesRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
