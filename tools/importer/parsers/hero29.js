/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Find the image element (background/hero image)
  let imageEl = null;
  const gridChildren = Array.from(grid.children);
  for (const child of gridChildren) {
    const img = child.querySelector('img');
    if (img) {
      imageEl = img;
      break;
    }
  }

  // Find the text content container (usually contains heading)
  let textContentEl = null;
  for (const child of gridChildren) {
    // Look for an h1 inside this child
    if (child.querySelector('h1')) {
      textContentEl = child;
      break;
    }
  }
  // Defensive fallback: If not found, try second child
  if (!textContentEl && gridChildren[1]) {
    textContentEl = gridChildren[1];
  }

  // Table rows
  const headerRow = ['Hero (hero29)'];
  const imageRow = [imageEl ? imageEl : '']; // Reference the actual image element
  const textRow = [textContentEl ? textContentEl : '']; // Reference the actual text container

  // Create table
  const cells = [headerRow, imageRow, textRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
