/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Locate the main content grid
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Step 2: Extract background asset (image or video placeholder)
  let backgroundAsset = '';
  for (const child of children) {
    if (child.classList.contains('utility-position-relative')) {
      const embed = child.querySelector('.w-embed-youtubevideo');
      if (embed) {
        // Prefer the image placeholder if present
        const img = embed.querySelector('img');
        if (img) backgroundAsset = img;
      }
    }
  }

  // Step 3: Extract headline, subheading, and CTA group
  let headline = '';
  let subheading = '';
  let ctaGroup = '';
  for (const child of children) {
    if (child.classList.contains('h1-heading')) headline = child;
    if (child.querySelector('p.subheading')) subheading = child.querySelector('p.subheading');
    if (child.classList.contains('button-group')) ctaGroup = child;
  }

  // Step 4: Compose content cell for row 3, preserving semantic HTML
  const contentCell = [];
  if (headline) contentCell.push(headline);
  if (subheading) contentCell.push(subheading);
  if (ctaGroup) contentCell.push(ctaGroup);

  // Step 5: Build table rows
  const headerRow = ['Hero (hero25)'];
  const backgroundRow = [backgroundAsset ? backgroundAsset : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  // Step 6: Create block table
  const cells = [headerRow, backgroundRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Step 7: Replace original element
  element.replaceWith(block);
}
