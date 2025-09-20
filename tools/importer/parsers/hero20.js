/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all images from the hero background collage
  function getHeroImages(el) {
    // Find the deepest grid with images
    const grid = el.querySelector('.desktop-3-column');
    if (!grid) return [];
    return Array.from(grid.querySelectorAll('img'));
  }

  // Helper: get hero text content (title, subheading, CTA)
  function getHeroContent(el) {
    // Find the content container
    const content = el.querySelector('.ix-hero-scale-3x-to-1x-content');
    if (!content) return [];
    const inner = content.querySelector('.container');
    if (!inner) return [];
    // Title
    const title = inner.querySelector('h1');
    // Subheading
    const subheading = inner.querySelector('p');
    // CTAs
    const ctaGroup = inner.querySelector('.button-group');
    let ctas = [];
    if (ctaGroup) {
      ctas = Array.from(ctaGroup.querySelectorAll('a'));
    }
    // Compose content cell
    const cellContent = [];
    if (title) cellContent.push(title);
    if (subheading) cellContent.push(subheading);
    if (ctas.length) cellContent.push(...ctas);
    return cellContent;
  }

  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Background images row (all collage images)
  const images = getHeroImages(element);
  // Place all images in a single cell (as a collage)
  const imagesRow = [images];

  // 3. Content row (title, subheading, CTAs)
  const contentCell = getHeroContent(element);
  const contentRow = [contentCell];

  // Compose table
  const cells = [
    headerRow,
    imagesRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
