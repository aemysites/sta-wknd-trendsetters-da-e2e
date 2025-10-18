/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the carousel images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (each is a slide container)
  const slideDivs = Array.from(grid.children);

  // Prepare the header row as required
  const headerRow = ['Carousel (carousel16)'];
  const rows = [headerRow];

  // For each slide, extract the image and add as a row with two columns (second column empty)
  slideDivs.forEach((slideDiv) => {
    const img = slideDiv.querySelector('img');
    if (img) {
      rows.push([img, '']); // Image in first cell, second cell empty
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
