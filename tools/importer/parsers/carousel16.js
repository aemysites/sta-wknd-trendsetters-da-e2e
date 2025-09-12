/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container holding all slides
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (each is a slide)
  const slideDivs = Array.from(grid.children);

  // Prepare table rows
  const rows = [];
  // Header row as specified
  rows.push(['Carousel (carousel16)']);

  // For each slide, extract the image
  slideDivs.forEach((slideDiv) => {
    const img = slideDiv.querySelector('img');
    if (!img) return; // skip if no image
    // Each row: [image, empty cell for text content]
    rows.push([img, '']);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document, { cols: 2 });

  // Replace the original element with the block table
  element.replaceWith(table);
}
