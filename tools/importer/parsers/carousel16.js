/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel (carousel16) block: 2 columns, first row is header, each subsequent row is [image, text content (empty if none)]
  const headerRow = ['Carousel (carousel16)'];
  const rows = [headerRow];

  // Find the grid container with images
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all immediate children of grid (each is a slide)
  const slides = Array.from(grid.querySelectorAll(':scope > div'));
  slides.forEach((slide) => {
    // Find the image inside this slide
    const imgContainer = slide.querySelector('.utility-aspect-2x3');
    let img = null;
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    // Only add row if image exists
    if (img) {
      rows.push([img, '']); // Always two columns: image, then (empty) text
    }
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace element with block
  element.replaceWith(block);
}
