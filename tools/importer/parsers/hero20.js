/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all images in the hero collage
  function getHeroImages(el) {
    // Find the grid with images (desktop-3-column)
    const grid = el.querySelector('.desktop-3-column');
    if (!grid) return [];
    // Get all immediate child divs with an img inside
    return Array.from(grid.querySelectorAll('.utility-position-relative img'));
  }

  // Helper: Get the content area (headline, subheading, CTAs)
  function getHeroContent(el) {
    // Find the content container
    const content = el.querySelector('.ix-hero-scale-3x-to-1x-content .container');
    if (!content) return null;
    // Extract headline (h1)
    const headline = content.querySelector('h1');
    // Extract subheading (p)
    const subheading = content.querySelector('p');
    // Extract CTA links (buttons)
    const ctaGroup = content.querySelector('.button-group');
    let ctas = [];
    if (ctaGroup) {
      ctas = Array.from(ctaGroup.querySelectorAll('a'));
    }
    // Compose content elements
    const contentElements = [];
    if (headline) contentElements.push(headline);
    if (subheading) contentElements.push(subheading);
    if (ctas.length) {
      // Wrap CTAs in a div for layout
      const ctaDiv = document.createElement('div');
      ctaDiv.append(...ctas);
      contentElements.push(ctaDiv);
    }
    return contentElements;
  }

  // Find the main hero image grid and content
  const heroImages = getHeroImages(element);
  const heroContent = getHeroContent(element);

  // Build the block table
  const headerRow = ['Hero (hero20)'];
  // Row 2: All hero images as a collage (array of img elements)
  const imageRow = [heroImages];
  // Row 3: Headline, subheading, CTA (array of elements)
  const contentRow = [heroContent];

  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
