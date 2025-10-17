/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all direct image elements in the grid
  function getGridImages(grid) {
    // Find all immediate child divs of the grid
    const gridItems = Array.from(grid.querySelectorAll(':scope > div'));
    const images = [];
    gridItems.forEach(item => {
      // Each item should contain a div with an img inside
      const imgContainer = item.querySelector(':scope > div');
      if (imgContainer) {
        const img = imgContainer.querySelector('img');
        if (img) images.push(img);
      }
    });
    return images;
  }

  // 1. Find the grid layout div
  const grid = element.querySelector('.grid-layout');
  if (!grid) return; // Defensive: If not found, do nothing

  // 2. Get all images from the grid
  const images = getGridImages(grid);

  // 3. Build the table rows
  const headerRow = ['Columns (columns16)'];
  // Second row: each image in its own column
  const imageRow = images.length ? images : [''];

  // 4. Create the block table
  const cells = [headerRow, imageRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the original element with the block
  element.replaceWith(block);
}
