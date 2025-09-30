/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all images from the hero image grid
  function getHeroImages(el) {
    // Find the grid with images (desktop-3-column)
    const grid = el.querySelector('.desktop-3-column');
    if (!grid) return [];
    return Array.from(grid.querySelectorAll('img'));
  }

  // Helper: get the hero content (title, subheading, CTAs)
  function getHeroContent(el) {
    // Find the content container
    const content = el.querySelector('.ix-hero-scale-3x-to-1x-content');
    if (!content) return null;
    return content;
  }

  // Find the main grid container inside the header
  const mainGrid = element.querySelector('.grid-layout.desktop-1-column');
  if (!mainGrid) return;

  // Get images for background collage
  const images = getHeroImages(mainGrid);
  // Defensive: only include images if present
  let collageDiv;
  if (images.length) {
    collageDiv = document.createElement('div');
    collageDiv.className = 'hero20-image-collage';
    images.forEach(img => collageDiv.appendChild(img));
  }

  // Get hero content (headline, subheading, CTAs)
  const heroContent = getHeroContent(mainGrid);

  // Compose table rows
  const headerRow = ['Hero (hero20)'];
  const imageRow = [collageDiv ? collageDiv : ''];
  const contentRow = [heroContent ? heroContent : ''];

  // Build the block table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
