/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be image and content block)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: image
  const imageEl = gridChildren.find(el => el.tagName === 'IMG');

  // Right column: content block
  const contentEl = gridChildren.find(el => el !== imageEl);

  // Compose the right column content
  // Eyebrow
  const eyebrow = contentEl.querySelector('.eyebrow');
  // Tag/badge
  const tag = contentEl.querySelector('.tag');
  // Heading
  const heading = contentEl.querySelector('h2, .h2-heading');
  // Byline row (author, role, date)
  const bylineRow = contentEl.querySelector('.flex-horizontal.flex-gap-xxs');

  // Build the right column cell content
  const rightColumnContent = [];
  if (eyebrow) rightColumnContent.push(eyebrow);
  if (tag) rightColumnContent.push(tag);
  if (heading) rightColumnContent.push(heading);
  if (bylineRow) rightColumnContent.push(bylineRow);

  // Table header
  const headerRow = ['Columns block (columns33)'];
  // Table second row: image (left), content (right)
  const contentRow = [imageEl, rightColumnContent];

  // Create the block table
  const cells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
