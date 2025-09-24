/* global WebImporter */
export default function parse(element, { document }) {
  // Find the collage grid of images for the background
  let gridDiv = element.querySelector('.desktop-3-column');
  let images = [];
  if (gridDiv) {
    images = Array.from(gridDiv.querySelectorAll('img'));
  }

  // Compose a container for all images (background)
  let backgroundContainer = null;
  if (images.length) {
    backgroundContainer = document.createElement('div');
    backgroundContainer.style.display = 'grid';
    backgroundContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
    backgroundContainer.style.gap = '0';
    images.forEach(img => {
      backgroundContainer.appendChild(img);
    });
  }

  // Find the hero text content (title, subheading, CTA)
  let heroContentDiv = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  let contentContainer = null;
  if (heroContentDiv) {
    contentContainer = heroContentDiv.querySelector('.container');
  }

  // Table header must match block name exactly
  const headerRow = ['Hero (hero20)'];
  const imageRow = [backgroundContainer || ''];
  const contentRow = [contentContainer || ''];

  // Compose and replace with the table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
