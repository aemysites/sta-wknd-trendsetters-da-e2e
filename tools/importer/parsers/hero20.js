/* global WebImporter */
export default function parse(element, { document }) {
  // --- 1. Header Row ---
  const headerRow = ['Hero (hero20)'];

  // --- 2. Background Image Row ---
  // Find the grid of images (background collage)
  let imagesGrid = element.querySelector('.grid-layout.desktop-3-column');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }
  let backgroundCell = '';
  if (images.length) {
    const wrapper = document.createElement('div');
    images.forEach(img => wrapper.appendChild(img)); // Reference, don't clone
    backgroundCell = wrapper;
  }

  // --- 3. Content Row ---
  // Find the content container with text and CTAs
  let contentDiv = element.querySelector('.ix-hero-scale-3x-to-1x-content .container.small-container');
  let contentCell = '';
  if (contentDiv) {
    contentCell = contentDiv;
  }

  // --- Compose table ---
  const rows = [
    headerRow,
    [backgroundCell],
    [contentCell],
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
