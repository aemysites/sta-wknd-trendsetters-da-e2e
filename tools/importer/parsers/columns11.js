/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.matches('section')) return;

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns11)'];

  // Find main grid (2 columns: left, right)
  const container = element.querySelector('.container');
  const mainGrid = container && container.querySelector('.grid-layout.tablet-1-column');
  if (!mainGrid) return;

  // --- COLUMN 1: Left (eyebrow + headline) ---
  const leftCol = mainGrid.children[0];
  let leftColContent = [];
  if (leftCol) {
    const eyebrow = leftCol.querySelector('.eyebrow');
    if (eyebrow) leftColContent.push(eyebrow);
    const headline = leftCol.querySelector('h1');
    if (headline) leftColContent.push(headline);
  }

  // --- COLUMN 2: Right (description, author, button) ---
  const rightCol = mainGrid.children[1];
  let rightColContent = [];
  if (rightCol) {
    const desc = rightCol.querySelector('.rich-text');
    if (desc) rightColContent.push(desc);
    const authorBlock = rightCol.querySelector('.grid-layout > .flex-horizontal');
    if (authorBlock) rightColContent.push(authorBlock);
    const button = rightCol.querySelector('.grid-layout > a.button');
    if (button) rightColContent.push(button);
  }

  // --- COLUMN 3: Images ---
  const imageGrid = container.querySelector('.grid-layout.mobile-portrait-1-column');
  let imageColContent = [];
  if (imageGrid) {
    imageGrid.querySelectorAll('img').forEach(img => {
      imageColContent.push(img);
    });
  }

  // Only include columns that have content
  const secondRow = [];
  if (leftColContent.length) secondRow.push(leftColContent);
  if (rightColContent.length) secondRow.push(rightColContent);
  if (imageColContent.length) secondRow.push(imageColContent);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);

  // Replace the original element
  element.replaceWith(table);
}
