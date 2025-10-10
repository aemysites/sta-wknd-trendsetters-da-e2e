/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero20)'];

  // 2. Find the collage background images
  // The images are inside a nested grid layout
  // Find the first .grid-layout.desktop-3-column inside the element
  const collageGrid = element.querySelector('.grid-layout.desktop-3-column');
  let collageImgs = [];
  if (collageGrid) {
    collageImgs = Array.from(collageGrid.querySelectorAll('img'));
  }

  // Defensive: fallback to any images in the hero if grid not found
  if (collageImgs.length === 0) {
    collageImgs = Array.from(element.querySelectorAll('img'));
  }

  // 3. Compose the background image cell
  // Place all collage images in a div for layout preservation
  let collageDiv = null;
  if (collageImgs.length > 0) {
    collageDiv = document.createElement('div');
    collageImgs.forEach(img => collageDiv.appendChild(img));
  }

  // 4. Find the content: heading, subheading, CTA
  // The content is in .ix-hero-scale-3x-to-1x-content > .container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentElements = [];
  if (contentContainer) {
    // Heading (h1)
    const heading = contentContainer.querySelector('h1');
    if (heading) contentElements.push(heading);
    // Subheading (p.subheading)
    const subheading = contentContainer.querySelector('p.subheading');
    if (subheading) contentElements.push(subheading);
    // CTA buttons (all <a> in .button-group)
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      const ctas = Array.from(buttonGroup.querySelectorAll('a'));
      if (ctas.length > 0) {
        const ctaDiv = document.createElement('div');
        ctaDiv.append(...ctas);
        contentElements.push(ctaDiv);
      }
    }
  }

  // 5. Compose the table rows
  const rows = [
    headerRow,
    [collageDiv || ''],
    [contentElements.length > 0 ? contentElements : '']
  ];

  // 6. Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
