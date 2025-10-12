/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Extract all collage images (background)
  function getHeroImages() {
    // Find the deepest grid-layout with images
    const gridLayouts = element.querySelectorAll('.grid-layout');
    let collageGrid = null;
    for (const grid of gridLayouts) {
      const imgs = grid.querySelectorAll('img');
      if (imgs.length >= 5) {
        collageGrid = grid;
        break;
      }
    }
    if (!collageGrid) return [];
    // Only direct children images
    return Array.from(collageGrid.querySelectorAll('img'));
  }

  // Helper: Extract hero text content (headline, subheading, CTA)
  function getHeroContent() {
    // Find the content container
    let content = element.querySelector('.ix-hero-scale-3x-to-1x-content');
    if (!content) {
      content = element.querySelector('.container');
    }
    if (!content) return [];
    // Find heading
    const heading = content.querySelector('h1');
    // Find subheading
    const subheading = content.querySelector('p');
    // Find CTA buttons
    const buttonGroup = content.querySelector('.button-group');
    let ctas = [];
    if (buttonGroup) {
      ctas = Array.from(buttonGroup.querySelectorAll('a'));
    }
    // Compose content elements
    const contentElements = [];
    if (heading) contentElements.push(heading);
    if (subheading) contentElements.push(subheading);
    if (ctas.length) contentElements.push(...ctas);
    return contentElements;
  }

  // Compose table rows
  const headerRow = ['Hero (hero20)'];
  const images = getHeroImages();
  const imageRow = [images.length ? images : ''];
  const heroContent = getHeroContent();
  const contentRow = [heroContent.length ? heroContent : ''];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
