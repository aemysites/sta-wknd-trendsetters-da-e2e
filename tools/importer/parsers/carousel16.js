/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the slides
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate child divs of the grid (each is a slide)
  const slideDivs = Array.from(grid.querySelectorAll(':scope > div'));

  // Build the table rows
  const rows = [];
  // Header row as specified
  const headerRow = ['Carousel (carousel16)'];
  rows.push(headerRow);

  slideDivs.forEach((slideDiv) => {
    // Find the image inside the slide
    const imgContainer = slideDiv.querySelector(':scope > div');
    let img = null;
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    // Defensive: if no image, skip this slide
    if (!img) return;
    // Always two columns: image and empty string for text content
    rows.push([img, '']);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
