/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Columns (columns33)'];

  // Defensive: Find the grid container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (should be two: image, right content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: image
  const leftCol = columns[0];
  let imageEl = leftCol;
  // Defensive: If it's not an image, find the first image inside
  if (!(imageEl.tagName === 'IMG')) {
    imageEl = leftCol.querySelector('img');
  }

  // Right column: text block
  const rightCol = columns[1];

  // Eyebrow/label
  const eyebrow = rightCol.querySelector('.eyebrow');
  // Tag (pill-shaped label)
  const tag = rightCol.querySelector('.tag');
  // Heading
  const heading = rightCol.querySelector('h2, .h2-heading');
  // Byline: all paragraph-sm elements (author, role, date, dot dividers)
  const bylineParts = Array.from(rightCol.querySelectorAll('.paragraph-sm'));
  // Compose byline as a fragment
  const bylineFragment = document.createElement('div');
  bylineParts.forEach((el, i) => {
    bylineFragment.appendChild(el);
    // Add space after each except last
    if (i < bylineParts.length - 1) bylineFragment.appendChild(document.createTextNode(' '));
  });

  // Compose right column cell
  const rightCellContent = [];
  if (eyebrow) rightCellContent.push(eyebrow);
  if (tag) rightCellContent.push(tag);
  if (heading) rightCellContent.push(heading);
  if (bylineParts.length) rightCellContent.push(bylineFragment);

  // Table row: image | text block
  const row = [imageEl, rightCellContent];

  // Build table
  const cells = [headerRow, row];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}
