/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns/images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid that contain the images
  const gridItems = Array.from(grid.children);

  // For each grid item, find the image inside
  const images = gridItems.map(item => {
    // Defensive: look for an image inside the item
    const img = item.querySelector('img');
    return img || null;
  }).filter(Boolean); // Only keep items with images

  // Build the table rows
  const headerRow = ['Columns block (columns16)'];
  // The second row: each image in its own column
  const imageRow = images;

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
