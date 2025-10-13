/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero38)'];

  // --- Row 2: Background image (optional) ---
  // This source does not have a background image, so leave row 2 empty
  const imageRow = [''];

  // --- Row 3: Content (heading, subheading, CTA) ---
  // Find the main grid container
  const grid = element.querySelector('.w-layout-grid');
  let contentCell = [];

  if (grid) {
    // Get all immediate children of the grid
    const gridChildren = grid.querySelectorAll(':scope > *');

    // First child: text content (heading + subheading)
    const textBlock = gridChildren[0];
    if (textBlock) {
      // Find heading (h2, h1, etc.)
      const heading = textBlock.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) contentCell.push(heading);
      // Find subheading (p, span, etc.)
      const subheading = textBlock.querySelector('p, .subheading');
      if (subheading) contentCell.push(subheading);
    }

    // Second child: CTA button (anchor)
    const ctaBlock = gridChildren[1];
    if (ctaBlock && ctaBlock.tagName === 'A') {
      contentCell.push(ctaBlock);
    }
  }

  // Defensive: If nothing was found, fallback to all text and links in the element
  if (contentCell.length === 0) {
    // Try to find heading
    const heading = element.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentCell.push(heading);
    // Try to find subheading
    const subheading = element.querySelector('p, .subheading');
    if (subheading) contentCell.push(subheading);
    // Try to find CTA
    const cta = element.querySelector('a');
    if (cta) contentCell.push(cta);
  }

  const contentRow = [contentCell];

  // Compose table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
