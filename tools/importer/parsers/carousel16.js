/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the carousel slides
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each child of the grid is a slide wrapper
  const slides = Array.from(grid.children);

  // Prepare table rows
  const rows = [];
  // Header row as required
  rows.push(['Carousel (carousel16)']);

  slides.forEach((slide) => {
    // Find the image inside the slide
    const imgContainer = slide.querySelector('.utility-aspect-2x3');
    let img = null;
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    // Only add row if image is present (mandatory)
    if (img) {
      // Always two columns: image, and (empty) text content
      rows.push([img, '']);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
