/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Find the background image grid (all images)
  // The images are inside: header > div > div.grid-layout.desktop-1-column > div > div.ix-hero-scale-3x-to-1x > div.grid-layout.desktop-3-column
  // Defensive: find the first .grid-layout.desktop-3-column inside the element
  const grid3Col = element.querySelector('.grid-layout.desktop-3-column');
  let images = [];
  if (grid3Col) {
    images = Array.from(grid3Col.querySelectorAll('img'));
  }
  // Place all images in a fragment for the background cell
  let backgroundCell;
  if (images.length > 0) {
    // Use a div to wrap the images for layout flexibility
    const bgDiv = document.createElement('div');
    images.forEach(img => bgDiv.appendChild(img));
    backgroundCell = bgDiv;
  } else {
    backgroundCell = '';
  }

  // 3. Find the hero content (title, subheading, CTA)
  // It's in: header > div > div.grid-layout.desktop-1-column > div > div.ix-hero-scale-3x-to-1x-content > div.container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentCell;
  if (contentContainer) {
    // We'll collect the h1, p.subheading, and the button group (if present)
    const parts = [];
    const h1 = contentContainer.querySelector('h1');
    if (h1) parts.push(h1);
    const subheading = contentContainer.querySelector('p.subheading');
    if (subheading) parts.push(subheading);
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) parts.push(buttonGroup);
    // Wrap in a div for structure
    const contentDiv = document.createElement('div');
    parts.forEach(part => contentDiv.appendChild(part));
    contentCell = contentDiv;
  } else {
    contentCell = '';
  }

  // 4. Build the table
  const tableCells = [
    headerRow,
    [backgroundCell],
    [contentCell],
  ];

  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
