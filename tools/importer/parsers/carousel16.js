/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the carousel images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all the direct children of the grid (each is a slide wrapper)
  const slideDivs = Array.from(grid.children);

  // Prepare the table rows
  const rows = [];
  // Header row as required
  rows.push(['Carousel (carousel16)']);

  // For each slide, extract the image (first cell), and add an empty second cell
  slideDivs.forEach((slideDiv) => {
    // Find the image inside this slide
    const img = slideDiv.querySelector('img');
    // Defensive: only add rows for valid images
    if (img) {
      rows.push([img, '']); // Two columns per row
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
