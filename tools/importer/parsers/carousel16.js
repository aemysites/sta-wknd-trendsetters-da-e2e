/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the carousel images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct child divs of the grid (each is a slide)
  const slideDivs = Array.from(grid.children);

  // Table header row as required
  const headerRow = ['Carousel (carousel16)'];
  const rows = [headerRow];

  // For each slide, extract the image and create a row with two columns (second column empty)
  slideDivs.forEach((slideDiv) => {
    const img = slideDiv.querySelector('img');
    if (img) {
      rows.push([img, '']); // Always two columns per row, second cell empty if no text
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
