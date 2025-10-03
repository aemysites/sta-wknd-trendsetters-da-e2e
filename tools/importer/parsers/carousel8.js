/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the target block name as the header row
  const headerRow = ['Carousel (carousel8)'];
  const rows = [headerRow];

  // Find the grid container with the images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each direct child of the grid is a slide container
  const slideDivs = Array.from(grid.children);

  slideDivs.forEach((slideDiv) => {
    // Find the image inside the nested divs
    const img = slideDiv.querySelector('img');
    if (!img) return; // skip if no image
    // Always two columns: image and (empty) text cell
    rows.push([img, '']);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
