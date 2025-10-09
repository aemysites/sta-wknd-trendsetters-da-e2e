/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting 4 children in grid
  // [0] Name, [1] Tags, [2] Headline, [3] Rich text
  const nameEl = gridChildren[0];
  const tagsEl = gridChildren[1];
  const headlineEl = gridChildren[2];
  const richTextEl = gridChildren[3];

  // Left column: name + tags
  const leftColContent = [];
  if (nameEl && nameEl.textContent.trim()) leftColContent.push(nameEl);
  if (tagsEl && tagsEl.children.length) leftColContent.push(tagsEl);

  // Center column: headline only
  const centerColContent = [];
  if (headlineEl && headlineEl.textContent.trim()) centerColContent.push(headlineEl);

  // Right column: rich text only
  const rightColContent = [];
  if (richTextEl && richTextEl.textContent.trim()) rightColContent.push(richTextEl);

  // Table structure:
  // Row 1: Header
  // Row 2: [leftColContent, centerColContent, rightColContent]
  const headerRow = ['Columns block (columns31)'];
  const contentRow = [leftColContent, centerColContent, rightColContent];

  const cells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the section with the table
  element.replaceWith(blockTable);
}
