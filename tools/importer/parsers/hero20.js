/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract background images (all <img> in the collage grid)
  const grid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  let backgroundImages = [];
  if (grid) {
    backgroundImages = Array.from(grid.querySelectorAll('img')).map(img => img);
  }

  // 2. Extract content: headline, subheading, CTAs
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentElements = [];
  if (contentContainer) {
    // Heading
    const heading = contentContainer.querySelector('h1');
    if (heading) contentElements.push(heading);
    // Subheading
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentElements.push(subheading);
    // CTA buttons (preserve links and text)
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      // Only reference the actual <a> elements
      const buttons = Array.from(buttonGroup.querySelectorAll('a'));
      buttons.forEach(btn => contentElements.push(btn));
    }
  }

  // 3. Compose table rows
  const headerRow = ['Hero (hero20)'];
  const backgroundRow = [backgroundImages]; // Array of <img> elements
  const contentRow = [contentElements]; // Array of elements: heading, subheading, buttons

  // 4. Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    contentRow,
  ], document);

  // 5. Replace original element
  element.replaceWith(table);
}
