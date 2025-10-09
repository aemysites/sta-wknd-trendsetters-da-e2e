/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel (carousel16) block parsing
  // 1. Header row
  const headerRow = ['Carousel (carousel16)'];

  // 2. Find the grid of images
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // 3. Get all image elements in the grid (each slide)
  const slideDivs = Array.from(grid.children);
  const rows = [];
  slideDivs.forEach((slideDiv) => {
    const img = slideDiv.querySelector('img');
    if (img) {
      rows.push([img, '']); // Two columns: image, empty text cell
    }
  });

  // 4. Build the table cells array
  const cells = [headerRow, ...rows];

  // 5. Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace the original element
  element.replaceWith(block);
}
