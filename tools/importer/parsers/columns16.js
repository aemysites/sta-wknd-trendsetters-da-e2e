/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with the images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (each column cell)
  const gridChildren = Array.from(grid.children);

  // For each child, find the innermost image element
  const images = gridChildren.map((col) => {
    // Find the image inside nested divs
    const img = col.querySelector('img');
    // Reference the existing image element if found, else an empty string
    return img || '';
  });

  // Build the table rows
  const headerRow = ['Columns block (columns16)'];
  const columnsRow = images;

  const cells = [
    headerRow,
    columnsRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
