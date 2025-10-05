/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct children of the section
  const children = Array.from(element.querySelectorAll(':scope > *'));

  // Find the grid with the image and text content
  let grid = children.find((c) => c.classList.contains('w-layout-grid'));
  if (!grid) {
    // fallback: just use the element itself
    grid = element;
  }

  // Find the image (background asset)
  let imageEl = null;
  // Only reference the actual <img> element, do not clone
  const imgs = grid.querySelectorAll('img');
  if (imgs.length > 0) {
    imageEl = imgs[imgs.length - 1]; // usually the image is the last in the grid
  }

  // Find the text content block (section with heading, paragraph, buttons)
  let textBlock = null;
  // Look for a .section inside the grid
  textBlock = grid.querySelector('.section');
  // Defensive: fallback to first div with heading if not found
  if (!textBlock) {
    textBlock = Array.from(grid.querySelectorAll('div')).find(div => div.querySelector('h1,h2,h3,h4,h5,h6'));
  }
  // If still not found, fallback to the grid itself
  if (!textBlock) {
    textBlock = grid;
  }

  // Compose table rows
  const headerRow = ['Hero (hero5)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [textBlock ? textBlock : ''];

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
