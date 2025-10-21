/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row (block name)
  const headerRow = ['Hero (hero20)'];

  // 2. Background image collage extraction
  // The background collage is the first major child div with many images inside
  // Find the grid with images
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  let images = [];
  if (grid) {
    images = Array.from(grid.querySelectorAll('img'));
  }
  // Defensive: only add if there are images
  const backgroundRow = [images.length ? images : ''];

  // 3. Content (heading, subheading, CTAs)
  // Find the content container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentElements = [];
  if (contentContainer) {
    // Heading (h1)
    const heading = contentContainer.querySelector('h1');
    if (heading) contentElements.push(heading);
    // Subheading (p)
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentElements.push(subheading);
    // Button group (CTAs)
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) contentElements.push(buttonGroup);
  }
  const contentRow = [contentElements.length ? contentElements : ''];

  // 4. Build the table
  const rows = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 5. Replace original element
  element.replaceWith(table);
}
