/* global WebImporter */
export default function parse(element, { document }) {
  // --- 1. Header row ---
  const headerRow = ['Hero (hero20)'];

  // --- 2. Background Images row ---
  // Find the grid-layout with desktop-3-column (contains images)
  let imagesRowContent = [];
  const imageGrid = element.querySelector('.grid-layout.desktop-3-column');
  if (imageGrid) {
    const imgDivs = Array.from(imageGrid.children);
    for (const imgDiv of imgDivs) {
      const img = imgDiv.querySelector('img');
      if (img) imagesRowContent.push(img);
    }
  }
  // Defensive: If no images found, leave cell empty
  if (imagesRowContent.length === 0) imagesRowContent = [''];

  // --- 3. Content row (title, subheading, CTA) ---
  let contentRowContent = [];
  const contentDiv = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (contentDiv) {
    const container = contentDiv.querySelector('.container.small-container');
    if (container) {
      // Heading
      const h1 = container.querySelector('h1');
      if (h1) contentRowContent.push(h1);
      // Subheading
      const subheading = container.querySelector('p.subheading');
      if (subheading) contentRowContent.push(subheading);
      // CTA buttons
      const buttonGroup = container.querySelector('.button-group');
      if (buttonGroup) {
        const links = Array.from(buttonGroup.querySelectorAll('a'));
        contentRowContent.push(...links);
      }
    }
  }
  if (contentRowContent.length === 0) contentRowContent = [''];

  // --- Compose table ---
  const cells = [
    headerRow,
    [imagesRowContent],
    [contentRowContent],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
