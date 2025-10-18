/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block (columns1) parsing for a grid of images
  // Header row for the block
  const headerRow = ['Columns block (columns1)'];

  // Find all images in the grid
  const images = element.querySelectorAll('img');
  // Each image goes in its own column in the second row
  const contentRow = Array.from(images).map((img) => {
    // Clone the image node to preserve attributes
    return img.cloneNode(true);
  });

  // Build the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
