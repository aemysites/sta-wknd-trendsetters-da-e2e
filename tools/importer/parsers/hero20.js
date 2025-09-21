/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero20)'];

  // 2. Find the background image collage (row 2)
  // The images are inside: .ix-hero-scale-3x-to-1x > .grid-layout.desktop-3-column
  const collageContainer = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout.desktop-3-column');
  let images = [];
  if (collageContainer) {
    images = Array.from(collageContainer.querySelectorAll('img'));
  }
  // Defensive: if no images found, leave cell empty
  const collageCell = images.length ? images : '';

  // 3. Find the content (row 3)
  // Content is inside: .ix-hero-scale-3x-to-1x-content .container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentCell = '';
  if (contentContainer) {
    // Gather heading, subheading, and CTAs
    const heading = contentContainer.querySelector('h1');
    const subheading = contentContainer.querySelector('p');
    const ctaGroup = contentContainer.querySelector('.button-group');
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (subheading) cellContent.push(subheading);
    if (ctaGroup) cellContent.push(ctaGroup);
    if (cellContent.length) contentCell = cellContent;
  }

  // 4. Build table rows
  const rows = [
    headerRow,
    [collageCell],
    [contentCell],
  ];

  // 5. Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
