/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout div (contains image and content)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Find the image (background)
  let bgImg = grid.querySelector('img');

  // Find the headline/title (h1)
  let title = grid.querySelector('h1');

  // Find CTA (button/link), if present (should be referenced, not cloned)
  let ctaGroup = grid.querySelector('.button-group');
  // Only include if it has visible children
  if (ctaGroup && ctaGroup.children.length === 0) ctaGroup = null;

  // Compose the table rows
  const headerRow = ['Hero (hero29)'];
  const imageRow = [bgImg ? bgImg : '']; // Reference the image element if present

  // Compose content cell: title (h1), and CTA if present
  const contentCell = [];
  if (title) contentCell.push(title);
  if (ctaGroup) contentCell.push(ctaGroup);
  const contentRow = [contentCell.length ? contentCell : ''];

  // Build the table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
