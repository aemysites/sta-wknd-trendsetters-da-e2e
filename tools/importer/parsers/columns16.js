/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all image elements inside the grid (defensive: only direct children)
  const imageDivs = Array.from(grid.children);
  const images = imageDivs.map(div => {
    // Find the first img descendant in each grid cell
    const img = div.querySelector('img');
    return img ? img : null;
  }).filter(Boolean);

  // Defensive: if no images found, do not replace
  if (images.length === 0) return;

  // Build the table rows
  const headerRow = ['Columns block (columns16)'];
  const imagesRow = images;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imagesRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
