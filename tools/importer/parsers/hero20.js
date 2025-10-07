/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all images from the hero collage
  function getHeroImages() {
    // Find the grid-layout with desktop-3-column (collage container)
    const collageGrid = element.querySelector('.grid-layout.desktop-3-column');
    if (!collageGrid) return [];
    // Only direct children with utility-position-relative (each image wrapper)
    const wrappers = collageGrid.querySelectorAll(':scope > .utility-position-relative');
    // Extract <img> elements
    return Array.from(wrappers)
      .map(w => w.querySelector('img'))
      .filter(img => img);
  }

  // Helper: Get hero text content (heading, subheading, CTAs)
  function getHeroTextContent() {
    // Find the content container
    const content = element.querySelector('.ix-hero-scale-3x-to-1x-content');
    if (!content) return null;
    // The actual text container
    const textContainer = content.querySelector('.container');
    if (!textContainer) return null;
    // Heading
    const heading = textContainer.querySelector('h1');
    // Subheading (paragraph)
    const subheading = textContainer.querySelector('p');
    // CTA buttons (anchor tags)
    const ctaGroup = textContainer.querySelector('.button-group');
    let ctas = [];
    if (ctaGroup) {
      ctas = Array.from(ctaGroup.querySelectorAll('a'));
    }
    // Compose content: heading, subheading, ctas
    const parts = [];
    if (heading) parts.push(heading);
    if (subheading) parts.push(subheading);
    if (ctas.length) parts.push(...ctas);
    return parts;
  }

  // Compose table rows
  const headerRow = ['Hero (hero20)'];

  // Row 2: Collage images (as a single cell containing all images)
  const heroImages = getHeroImages();
  const imagesRow = [heroImages];

  // Row 3: Hero text content (heading, subheading, CTAs)
  const heroTextContent = getHeroTextContent();
  const textRow = [heroTextContent];

  // Build the table
  const cells = [headerRow, imagesRow, textRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
