/* global WebImporter */
export default function parse(element, { document }) {
  // --- 1. HEADER ROW ---
  const headerRow = ['Hero (hero20)'];

  // --- 2. BACKGROUND IMAGE ROW ---
  // Find the grid of images (collage background)
  let imagesRowDiv = element.querySelector('.grid-layout.desktop-3-column');
  if (!imagesRowDiv) {
    imagesRowDiv = element.querySelector('.grid-layout');
  }
  let images = [];
  if (imagesRowDiv) {
    images = Array.from(imagesRowDiv.querySelectorAll('img'));
  }
  // All images go in a single cell as references
  const backgroundRow = [images];

  // --- 3. CONTENT ROW ---
  // Find the content container with heading, subheading, and CTAs
  let contentDiv = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (!contentDiv) {
    // fallback: any container with h1
    contentDiv = element.querySelector('h1')?.closest('div');
  }
  let contentElements = [];
  if (contentDiv) {
    // Heading
    const heading = contentDiv.querySelector('h1');
    if (heading) contentElements.push(heading);
    // Subheading
    const subheading = contentDiv.querySelector('p');
    if (subheading) contentElements.push(subheading);
    // CTA buttons
    const buttonGroup = contentDiv.querySelector('.button-group');
    if (buttonGroup) {
      const ctas = Array.from(buttonGroup.querySelectorAll('a'));
      contentElements.push(...ctas);
    }
  }
  const contentRow = [contentElements];

  // --- Compose table ---
  const cells = [
    headerRow,
    backgroundRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
