/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Extract background images (collage)
  // Find the grid layout with images
  let backgroundImagesContainer = element.querySelector('.desktop-3-column');
  if (!backgroundImagesContainer) {
    // fallback: find the first grid with multiple images
    backgroundImagesContainer = element.querySelector('[class*="grid-layout"]');
  }
  // Get all images inside the collage
  const images = backgroundImagesContainer
    ? Array.from(backgroundImagesContainer.querySelectorAll('img'))
    : [];
  // Defensive: only include images if found
  const backgroundRow = [images.length ? images : ''];

  // 3. Extract hero text and CTA
  // Find the content container
  let contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (!contentContainer) {
    // fallback: find the first container with h1
    contentContainer = element.querySelector('h1')?.closest('div');
  }
  // Get heading, subheading, and buttons
  let heading = contentContainer?.querySelector('h1');
  let subheading = contentContainer?.querySelector('p');
  // Get all CTA links
  let ctas = [];
  if (contentContainer) {
    ctas = Array.from(contentContainer.querySelectorAll('a'));
  }
  // Compose the hero text cell
  const heroTextCell = [];
  if (heading) heroTextCell.push(heading);
  if (subheading) heroTextCell.push(subheading);
  if (ctas.length) heroTextCell.push(...ctas);
  const heroTextRow = [heroTextCell.length ? heroTextCell : ''];

  // 4. Compose table rows
  const rows = [
    headerRow,
    backgroundRow,
    heroTextRow,
  ];

  // 5. Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // 6. Replace the original element
  element.replaceWith(block);
}
