/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Background image row (collage of images)
  // Find the grid that contains all the images
  const grid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  let images = [];
  if (grid) {
    images = Array.from(grid.querySelectorAll('img'));
  }
  // Defensive: if no images found, leave cell empty
  const backgroundRow = [images.length ? images : ''];

  // 3. Content row (title, subheading, CTA)
  // Find the content container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentElements = [];
  if (contentContainer) {
    // Title (h1)
    const h1 = contentContainer.querySelector('h1');
    if (h1) contentElements.push(h1);
    // Subheading (p.subheading)
    const subheading = contentContainer.querySelector('p.subheading');
    if (subheading) contentElements.push(subheading);
    // CTA buttons (all links in .button-group)
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      const ctas = Array.from(buttonGroup.querySelectorAll('a'));
      if (ctas.length) contentElements.push(...ctas);
    }
  }
  const contentRow = [contentElements.length ? contentElements : ''];

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
