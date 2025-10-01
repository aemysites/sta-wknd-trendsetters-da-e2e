/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Find the background image collage container (contains all images)
  // The image collage is inside the first .ix-hero-scale-3x-to-1x > .grid-layout
  let backgroundImageGrid = null;
  const gridCandidates = element.querySelectorAll('.ix-hero-scale-3x-to-1x .grid-layout');
  if (gridCandidates.length) {
    backgroundImageGrid = gridCandidates[0];
  }

  // Defensive: if not found, fallback to first .grid-layout
  if (!backgroundImageGrid) {
    backgroundImageGrid = element.querySelector('.grid-layout');
  }

  // 3. Compose the background image row
  // We'll use the entire grid of images as a single cell (as in the screenshot)
  const backgroundRow = [backgroundImageGrid ? backgroundImageGrid : ''];

  // 4. Find the content: headline, subheading, CTAs
  // The content is inside .ix-hero-scale-3x-to-1x-content
  let content = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (!content) {
    // Defensive: fallback to .ix-hero-scale-3x-to-1x-content
    content = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  }

  // 5. Compose the content row
  const contentRow = [content ? content : ''];

  // 6. Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    contentRow
  ], document);

  // 7. Replace the original element
  element.replaceWith(table);
}
