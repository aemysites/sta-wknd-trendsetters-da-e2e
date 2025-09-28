/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid containing the slides
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate child divs of the grid (each is a slide)
  const slideDivs = Array.from(grid.querySelectorAll(':scope > div'));

  // Header row as specified
  const headerRow = ['Carousel (carousel8)'];
  const rows = [headerRow];

  slideDivs.forEach((slideDiv) => {
    // Find the image inside this slide
    const imgContainer = slideDiv.querySelector(':scope > div');
    let img = null;
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    } else {
      img = slideDiv.querySelector('img');
    }

    // Defensive: skip if no image
    if (!img) return;

    // Always add two columns: image and empty string for text (to ensure 2 columns per row)
    rows.push([img, '']);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
