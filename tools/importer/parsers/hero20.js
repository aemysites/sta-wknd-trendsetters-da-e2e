/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Find the background image collage container (the grid of images)
  // It's the first .grid-layout.desktop-3-column inside the hero structure
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  let backgroundImages = [];
  if (grid) {
    // Collect all <img> elements in the grid
    backgroundImages = Array.from(grid.querySelectorAll('img'));
  }

  // If there are images, wrap them in a container div for the cell
  let bgCellContent;
  if (backgroundImages.length > 0) {
    const bgDiv = document.createElement('div');
    backgroundImages.forEach(img => bgDiv.appendChild(img));
    bgCellContent = bgDiv;
  } else {
    bgCellContent = '';
  }

  // 3. Find the content area (heading, subheading, CTAs)
  // It's the .ix-hero-scale-3x-to-1x-content container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  let contentCellContent = '';
  if (contentContainer) {
    // We'll extract the h1, subheading, and button group
    const h1 = contentContainer.querySelector('h1');
    const subheading = contentContainer.querySelector('.subheading');
    const buttonGroup = contentContainer.querySelector('.button-group');
    // Compose into a div for the cell
    const contentDiv = document.createElement('div');
    if (h1) contentDiv.appendChild(h1);
    if (subheading) contentDiv.appendChild(subheading);
    if (buttonGroup) contentDiv.appendChild(buttonGroup);
    contentCellContent = contentDiv;
  }

  // 4. Compose the table rows
  const rows = [
    headerRow,
    [bgCellContent],
    [contentCellContent],
  ];

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
