/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by tag/class
  function getDirectChildrenByClass(parent, className) {
    return Array.from(parent.children).filter(child => child.classList.contains(className));
  }

  // Find the main grid that contains the two main columns (headline/desc and intro)
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;

  // The first two direct children of mainGrid are the two main columns
  const mainColumns = Array.from(mainGrid.children);
  if (mainColumns.length < 2) return;

  // Left column: headline/eyebrow
  const leftCol = mainColumns[0];
  // Right column: description, author, button
  const rightCol = mainColumns[1];

  // Second grid: two images
  const imageGrid = container.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let img1 = null, img2 = null;
  if (imageGrid) {
    const imgDivs = Array.from(imageGrid.children);
    img1 = imgDivs[0]?.querySelector('img');
    img2 = imgDivs[1]?.querySelector('img');
  }

  // Build the first row: block name
  const headerRow = ['Columns (columns11)'];

  // Build the second row: main content columns
  // Left column: eyebrow + headline
  // Right column: description, author, button
  const leftColContent = [];
  // Eyebrow (Trend alert)
  const eyebrow = leftCol.querySelector('.eyebrow');
  if (eyebrow) leftColContent.push(eyebrow);
  // Headline (h1)
  const headline = leftCol.querySelector('h1');
  if (headline) leftColContent.push(headline);

  const rightColContent = [];
  // Description paragraph
  const desc = rightCol.querySelector('.rich-text');
  if (desc) rightColContent.push(desc);
  // Author/Meta info
  const metaRow = rightCol.querySelector('.w-layout-grid');
  if (metaRow) {
    // Only add the author/meta info, not the button
    const authorBlock = metaRow.querySelector('.flex-horizontal.y-center.flex-gap-xs');
    if (authorBlock) rightColContent.push(authorBlock);
    // Button (Read more)
    const button = metaRow.querySelector('a.button');
    if (button) rightColContent.push(button);
  }

  // Compose the second row
  const row2 = [leftColContent, rightColContent];

  // Build the third row: two images
  // Each image in its own column
  const row3 = [];
  if (img1) row3.push([img1]);
  if (img2) row3.push([img2]);

  // Only add row3 if we have two images
  const tableRows = [headerRow, row2];
  if (row3.length === 2) tableRows.push(row3);

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
