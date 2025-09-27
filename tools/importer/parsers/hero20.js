/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all images in the hero grid
  function getHeroImages(el) {
    const grid = el.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
    if (!grid) return [];
    return Array.from(grid.querySelectorAll('img'));
  }

  // Helper to get the hero content (heading, subheading, buttons)
  function getHeroContent(el) {
    const content = el.querySelector('.ix-hero-scale-3x-to-1x-content');
    if (!content) return null;
    const inner = content.querySelector('.container');
    return inner || content;
  }

  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Background image row (all images in the hero grid)
  const images = getHeroImages(element);
  const imageRow = [images.length ? images : ''];

  // 3. Content row (heading, subheading, CTAs)
  const heroContent = getHeroContent(element);
  const contentRow = [heroContent ? heroContent : ''];

  // Build the table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
