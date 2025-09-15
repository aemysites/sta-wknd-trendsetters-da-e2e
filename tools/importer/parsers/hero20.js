/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Background images row
  // Find the grid of images (background collage)
  let imagesRowContent = [];
  const gridImageContainer = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
  if (gridImageContainer) {
    // Get all immediate child images
    const imgEls = Array.from(gridImageContainer.querySelectorAll('img'));
    if (imgEls.length > 0) {
      imagesRowContent = imgEls;
    }
  }
  // If no images found, leave empty
  const imagesRow = [imagesRowContent.length ? imagesRowContent : ''];

  // 3. Content row (title, subheading, CTA)
  // Find the content container
  let contentRowContent = [];
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentContainer) {
    // Title (h1)
    const h1 = contentContainer.querySelector('h1');
    if (h1) contentRowContent.push(h1);
    // Subheading (p)
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentRowContent.push(subheading);
    // CTA buttons (a)
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      // Only include the links (not the group div)
      const links = Array.from(buttonGroup.querySelectorAll('a'));
      if (links.length) contentRowContent.push(...links);
    }
  }
  const contentRow = [contentRowContent.length ? contentRowContent : ''];

  // Compose table
  const cells = [
    headerRow,
    imagesRow,
    contentRow,
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
