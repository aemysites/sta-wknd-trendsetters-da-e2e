/* global WebImporter */
export default function parse(element, { document }) {
  // Extract background images for collage
  const grid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  let images = [];
  if (grid) {
    images = Array.from(grid.querySelectorAll('img'));
  }

  let backgroundDiv = null;
  if (images.length) {
    backgroundDiv = document.createElement('div');
    backgroundDiv.setAttribute('data-hero20-background-collage', '');
    images.forEach(img => backgroundDiv.appendChild(img)); // Reference, not clone
  }

  // Extract heading, subheading, and CTAs
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentElements = [];
  if (contentContainer) {
    const h1 = contentContainer.querySelector('h1');
    if (h1) contentElements.push(h1); // Reference, not clone
    const subheading = contentContainer.querySelector('p.subheading');
    if (subheading) contentElements.push(subheading); // Reference, not clone
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      const buttons = Array.from(buttonGroup.querySelectorAll('a'));
      if (buttons.length) {
        const ctaDiv = document.createElement('div');
        ctaDiv.className = 'hero20-cta-group';
        buttons.forEach(btn => ctaDiv.appendChild(btn)); // Reference, not clone
        contentElements.push(ctaDiv);
      }
    }
  }

  // Table rows
  const headerRow = ['Hero (hero20)'];
  const backgroundRow = [backgroundDiv ? backgroundDiv : ''];
  const contentRow = [contentElements.length ? contentElements : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
