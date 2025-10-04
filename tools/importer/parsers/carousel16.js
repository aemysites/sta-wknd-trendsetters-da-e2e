/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel block header
  const headerRow = ['Carousel (carousel16)'];
  const rows = [headerRow];

  // Find the grid container holding the images
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of grid (each is a slide)
  const slideDivs = Array.from(grid.children);

  slideDivs.forEach((slideDiv) => {
    // Find the image inside each slide
    const imgContainer = slideDiv.querySelector('.utility-aspect-2x3');
    let img = null;
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    if (!img) return;

    // Always two columns: image and (empty) text column
    rows.push([img, '']);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
