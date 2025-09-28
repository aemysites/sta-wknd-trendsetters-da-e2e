/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract collage background images
  const gridLayout = element.querySelector('.desktop-3-column');
  let backgroundImages = [];
  if (gridLayout) {
    // Only reference actual <img> elements, not URLs
    backgroundImages = Array.from(gridLayout.querySelectorAll('img'));
  }

  // 2. Extract hero content (headline, subheading, CTA)
  let heroContent = '';
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentContainer) {
    // Reference the actual container element (preserves headings, paragraphs, buttons)
    heroContent = contentContainer;
  }

  // 3. Table construction
  const headerRow = ['Hero (hero20)']; // Must match block name exactly
  const backgroundRow = [backgroundImages.length ? backgroundImages : ''];
  const contentRow = [heroContent ? heroContent : ''];
  const rows = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 4. Replace original element
  element.replaceWith(table);
}
