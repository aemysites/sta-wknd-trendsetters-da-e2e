/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Background images row
  // Find the grid of images (background collage)
  let imagesRowContent = [];
  const gridLayouts = element.querySelectorAll('.grid-layout.desktop-3-column');
  if (gridLayouts.length > 0) {
    // Get all images inside this grid
    const imgEls = gridLayouts[0].querySelectorAll('img');
    if (imgEls.length > 0) {
      imagesRowContent = Array.from(imgEls);
    }
  }
  // Defensive: If no images found, leave cell empty
  const imagesRow = [imagesRowContent.length > 0 ? imagesRowContent : ''];

  // 3. Content row (heading, subheading, CTAs)
  let contentRowContent = [];
  // Find the main content container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentContainer) {
    // Heading
    const heading = contentContainer.querySelector('h1');
    if (heading) contentRowContent.push(heading);
    // Subheading
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentRowContent.push(subheading);
    // CTA buttons
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      // Only include direct child links (CTAs)
      const ctas = Array.from(buttonGroup.querySelectorAll('a'));
      if (ctas.length) contentRowContent.push(...ctas);
    }
  }
  // Defensive: If nothing found, leave cell empty
  const contentRow = [contentRowContent.length > 0 ? contentRowContent : ''];

  // Build table
  const cells = [
    headerRow,
    imagesRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
