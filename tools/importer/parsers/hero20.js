/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the collage images (backgrounds)
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  let images = [];
  if (grid) {
    images = Array.from(grid.querySelectorAll('img'));
  }

  // 2. Find the hero content (headline, subheading, CTA)
  const heroContentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');

  // 3. Build the table rows
  const headerRow = ['Hero (hero20)'];

  // Row 2: collage of images as a group (div containing all images, referencing existing DOM nodes)
  let imagesDiv = document.createElement('div');
  imagesDiv.className = 'hero20-background-collage';
  images.forEach(img => imagesDiv.appendChild(img));
  const collageRow = [imagesDiv];

  // Row 3: hero content (reference the actual container, not a clone)
  const contentRow = [heroContentContainer];

  // 4. Assemble the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    collageRow,
    contentRow
  ], document);

  // 5. Replace the original element
  element.replaceWith(table);
}
