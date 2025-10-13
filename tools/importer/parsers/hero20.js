/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Find the background image grid (row 2)
  // The grid is deeply nested, but always under a .desktop-3-column grid-layout
  const gridLayout = element.querySelector('.desktop-3-column.grid-layout');
  let images = [];
  if (gridLayout) {
    images = Array.from(gridLayout.querySelectorAll('img'));
  }
  // Defensive: if not found, fallback to all images in the element
  if (images.length === 0) {
    images = Array.from(element.querySelectorAll('img'));
  }
  // Create a div to hold all images as a collage
  const collageDiv = document.createElement('div');
  collageDiv.style.display = 'grid';
  collageDiv.style.gridTemplateColumns = 'repeat(3, 1fr)';
  collageDiv.style.gap = '8px';
  images.forEach(img => collageDiv.appendChild(img));

  // 3. Find the hero content (row 3)
  // This is under .ix-hero-scale-3x-to-1x-content
  const heroContent = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  let contentElements = [];
  if (heroContent) {
    // Heading
    const heading = heroContent.querySelector('h1');
    if (heading) contentElements.push(heading);
    // Subheading
    const subheading = heroContent.querySelector('p');
    if (subheading) contentElements.push(subheading);
    // CTA buttons (all <a> inside .button-group)
    const buttonGroup = heroContent.querySelector('.button-group');
    if (buttonGroup) {
      const ctas = Array.from(buttonGroup.querySelectorAll('a'));
      if (ctas.length) {
        // Wrap CTAs in a div for layout
        const ctaDiv = document.createElement('div');
        ctaDiv.style.display = 'flex';
        ctaDiv.style.gap = '1rem';
        ctas.forEach(a => ctaDiv.appendChild(a));
        contentElements.push(ctaDiv);
      }
    }
  }
  // Defensive: if not found, fallback to first heading, paragraph, and links in element
  if (contentElements.length === 0) {
    const fallbackHeading = element.querySelector('h1, h2, h3');
    if (fallbackHeading) contentElements.push(fallbackHeading);
    const fallbackP = element.querySelector('p');
    if (fallbackP) contentElements.push(fallbackP);
    const fallbackLinks = Array.from(element.querySelectorAll('a'));
    if (fallbackLinks.length) {
      const fallbackDiv = document.createElement('div');
      fallbackLinks.forEach(a => fallbackDiv.appendChild(a));
      contentElements.push(fallbackDiv);
    }
  }

  // 4. Build table rows
  const rows = [
    headerRow,
    [collageDiv],
    [contentElements]
  ];

  // 5. Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // 6. Replace original element
  element.replaceWith(block);
}
