/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row must match block name exactly
  const headerRow = ['Hero (hero38)'];

  // Find the main grid layout (content container)
  const grid = element.querySelector('.grid-layout');
  let title = null;
  let subheading = null;
  let cta = null;

  if (grid) {
    // Get direct children of grid
    const gridChildren = grid.querySelectorAll(':scope > *');
    // Text block is usually first child
    if (gridChildren.length > 0) {
      const textBlock = gridChildren[0];
      title = textBlock.querySelector('h1, h2, h3, h4, h5, h6');
      subheading = textBlock.querySelector('p');
    }
    // CTA block is usually second child
    if (gridChildren.length > 1) {
      // If the child is an anchor or button, use it directly
      if (gridChildren[1].tagName === 'A' || gridChildren[1].tagName === 'BUTTON') {
        cta = gridChildren[1];
      } else {
        // Otherwise, look for anchor/button inside
        cta = gridChildren[1].querySelector('a, button');
      }
    }
  }

  // Row 2: Background image (none in this example, so leave blank)
  const imageRow = [''];

  // Row 3: Content cell
  const contentCell = [];
  if (title) contentCell.push(title);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);
  const contentRow = [contentCell];

  // Compose table rows
  const rows = [headerRow, imageRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
