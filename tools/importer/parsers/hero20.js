/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all images from the hero grid
  let backgroundImages = [];
  // Find the grid that contains the hero images
  const grid = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
  if (grid) {
    backgroundImages = Array.from(grid.querySelectorAll('img'));
  }

  // Compose a div to hold all images as a collage (to match the visual)
  let imagesContainer = null;
  if (backgroundImages.length) {
    imagesContainer = document.createElement('div');
    imagesContainer.style.display = 'flex';
    imagesContainer.style.flexWrap = 'wrap';
    imagesContainer.style.gap = '0';
    backgroundImages.forEach(img => {
      imagesContainer.appendChild(img);
    });
  }

  // Find the content area (heading, subheading, CTAs)
  const contentCol = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentBlock = null;
  if (contentCol) {
    // We'll wrap all content in a div for the cell
    contentBlock = document.createElement('div');
    // Heading
    const h1 = contentCol.querySelector('h1');
    if (h1) contentBlock.appendChild(h1);
    // Subheading
    const subheading = contentCol.querySelector('p');
    if (subheading) contentBlock.appendChild(subheading);
    // CTA buttons
    const buttonGroup = contentCol.querySelector('.button-group');
    if (buttonGroup) contentBlock.appendChild(buttonGroup);
  }

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Hero (hero20)']);
  // Background images row
  rows.push([imagesContainer || '']);
  // Content row
  rows.push([contentBlock || '']);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
