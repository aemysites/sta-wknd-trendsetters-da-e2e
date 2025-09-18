/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // 1. Table header row
  const headerRow = ['Hero (hero20)'];

  // 2. Background images row
  // Find all images in the grid collage
  let images = [];
  const gridCollage = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
  if (gridCollage) {
    images = Array.from(gridCollage.querySelectorAll('img'));
  }
  // Place all images in a single cell (as an array)
  const imagesRow = [images];

  // 3. Content row
  // Find the content container
  let contentElements = [];
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentContainer) {
    // Heading
    const heading = contentContainer.querySelector('h1');
    if (heading) contentElements.push(heading);
    // Subheading
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentElements.push(subheading);
    // Button group (CTA)
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) contentElements.push(buttonGroup);
  }
  const contentRow = [contentElements];

  // 4. Build the table
  const cells = [headerRow, imagesRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the original element
  element.replaceWith(block);
}
