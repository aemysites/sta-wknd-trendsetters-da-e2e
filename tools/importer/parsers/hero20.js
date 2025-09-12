/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header row
  const headerRow = ['Hero (hero20)'];

  // --- Background Images ---
  // Find the grid with images (the first .grid-layout with >2 .utility-position-relative children)
  let imagesContainer = null;
  const gridContainers = element.querySelectorAll('.grid-layout');
  for (const grid of gridContainers) {
    const imgWrappers = grid.querySelectorAll('.utility-position-relative');
    if (imgWrappers.length > 2) {
      imagesContainer = grid;
      break;
    }
  }
  let images = [];
  if (imagesContainer) {
    images = Array.from(imagesContainer.querySelectorAll('img'));
  }
  const backgroundCell = images.length ? images : '';

  // --- Content (Heading, Subheading, CTA) ---
  // Find the content container
  let contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (!contentContainer) {
    contentContainer = element.querySelector('h1')?.parentElement || element;
  }
  const heading = contentContainer.querySelector('h1');
  const subheading = contentContainer.querySelector('p');
  let ctas = [];
  const buttonGroup = contentContainer.querySelector('.button-group');
  if (buttonGroup) {
    ctas = Array.from(buttonGroup.querySelectorAll('a'));
  } else {
    ctas = Array.from(contentContainer.querySelectorAll('a'));
  }
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (ctas.length) contentCell.push(...ctas);

  // Compose table rows
  const rows = [
    headerRow,
    [backgroundCell],
    [contentCell]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
