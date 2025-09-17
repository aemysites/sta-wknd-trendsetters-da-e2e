/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Header row for the block table
  const headerRow = ['Carousel (carousel36)'];

  // Find the grid containing the images
  const imageGrid = Array.from(element.querySelectorAll('div'))
    .find(div => div.classList.contains('grid-layout') && div.classList.contains('mobile-portrait-1-column'));

  // Get all images inside the grid
  const images = imageGrid ? Array.from(imageGrid.querySelectorAll('img')) : [];

  // Extract text content for the carousel (title, description, CTAs)
  const textContainer = element.querySelector('.h1-heading')?.parentElement;
  let textContent = '';
  if (textContainer) {
    // Clone to avoid mutating the DOM
    const clone = textContainer.cloneNode(true);
    // Remove the image grid from the clone
    const gridToRemove = clone.querySelector('.flex-horizontal');
    if (gridToRemove) gridToRemove.remove();
    textContent = clone.innerHTML.trim();
  }

  // Each row should have two columns: image, and text content (only in first row)
  const rows = images.map((img, idx) => {
    if (idx === 0) {
      // Only first slide gets the text content
      return [img, textContent];
    }
    return [img, ''];
  });

  // Compose the table data
  const cells = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
