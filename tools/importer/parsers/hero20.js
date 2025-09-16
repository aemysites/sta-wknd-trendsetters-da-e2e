/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // --- HEADER ROW ---
  const headerRow = ['Hero (hero20)'];

  // --- BACKGROUND IMAGES ROW ---
  // Find all images in the hero background collage
  let imageRowContent = [];
  // The images are inside: header > div > div > div.ix-hero-scale-3x-to-1x > div.grid-layout > div > img
  const collageContainer = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
  if (collageContainer) {
    const collageImages = collageContainer.querySelectorAll('img');
    if (collageImages.length) {
      imageRowContent = Array.from(collageImages);
    }
  }
  // If no images found, leave empty
  const imagesRow = [imageRowContent.length ? imageRowContent : ''];

  // --- CONTENT ROW ---
  // Find the content container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentRowContent = [];
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
      // Only include direct <a> children (buttons)
      const buttons = Array.from(buttonGroup.querySelectorAll('a'));
      if (buttons.length) contentRowContent.push(...buttons);
    }
  }
  // If nothing found, leave empty
  const contentRow = [contentRowContent.length ? contentRowContent : ''];

  // --- BUILD TABLE ---
  const cells = [
    headerRow,
    imagesRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
