/* global WebImporter */
export default function parse(element, { document }) {
  // --- Hero (hero20) block parser ---
  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Background images (collage)
  // Find the grid containing the images
  const grid = element.querySelector('.desktop-3-column');
  let images = [];
  if (grid) {
    images = Array.from(grid.querySelectorAll('img'));
  }
  // Defensive: empty cell if no images
  const imagesRow = [images.length ? images : ''];

  // 3. Hero content (heading, subheading, CTA)
  const contentDiv = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let heroContent = [];
  if (contentDiv) {
    // Heading
    const heading = contentDiv.querySelector('h1');
    if (heading) heroContent.push(heading);
    // Subheading
    const subheading = contentDiv.querySelector('p');
    if (subheading) heroContent.push(subheading);
    // CTA buttons
    const buttonGroup = contentDiv.querySelector('.button-group');
    if (buttonGroup) {
      const ctas = Array.from(buttonGroup.querySelectorAll('a'));
      if (ctas.length) heroContent.push(...ctas);
    }
  }
  const contentRow = [heroContent.length ? heroContent : ''];

  // 4. Compose and replace with block table
  const rows = [headerRow, imagesRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
