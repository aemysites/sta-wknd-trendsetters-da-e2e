/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the carousel slides
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const slides = Array.from(grid.children);

  // Table header row as required by block spec
  const headerRow = ['Carousel (carousel32)'];
  const rows = [headerRow];

  // For each slide, extract the image (first cell), always include a second cell (empty if no text)
  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    // Always provide two columns: image and (empty) text
    if (img) {
      rows.push([img, '']);
    }
  });

  // Create the carousel block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
