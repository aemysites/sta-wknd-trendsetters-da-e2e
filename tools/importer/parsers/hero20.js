/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Background image(s) row: gather all images in the hero grid
  // Find the grid-layout with desktop-3-column (contains all images)
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  let images = [];
  if (grid) {
    images = Array.from(grid.querySelectorAll('img'));
  }
  // Defensive: if no grid found, try to get all images in the element
  if (!images.length) {
    images = Array.from(element.querySelectorAll('img'));
  }
  // Place all images in a fragment for the background cell
  const bgFragment = document.createDocumentFragment();
  images.forEach(img => bgFragment.appendChild(img));

  // 3. Content row: heading, subheading, CTAs
  // Find the content container
  let contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (!contentContainer) {
    contentContainer = element.querySelector('.container.small-container');
  }
  let contentCell = [];
  if (contentContainer) {
    // We'll collect: h1, subheading (p), and button group (links)
    const parts = [];
    const h1 = contentContainer.querySelector('h1');
    if (h1) parts.push(h1);
    const subheading = contentContainer.querySelector('p');
    if (subheading) parts.push(subheading);
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      // Only keep anchor tags (links)
      const ctas = Array.from(buttonGroup.querySelectorAll('a'));
      if (ctas.length) {
        const btnDiv = document.createElement('div');
        ctas.forEach(a => btnDiv.appendChild(a));
        parts.push(btnDiv);
      }
    } else {
      // Fallback: check for any links in container
      const ctas = Array.from(contentContainer.querySelectorAll('a'));
      if (ctas.length) {
        const btnDiv = document.createElement('div');
        ctas.forEach(a => btnDiv.appendChild(a));
        parts.push(btnDiv);
      }
    }
    contentCell = parts;
  } else {
    // Fallback: just use all text content
    contentCell = [document.createTextNode(element.textContent.trim())];
  }

  // Compose the table
  const rows = [
    headerRow,
    [bgFragment],
    [contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
