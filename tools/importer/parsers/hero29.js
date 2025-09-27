/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // --- 1. Header row ---
  const headerRow = ['Hero (hero29)'];

  // --- 2. Background image row ---
  let bgImg = null;
  const imgContainer = element.querySelector('.ix-parallax-scale-out-hero');
  if (imgContainer) {
    bgImg = imgContainer.querySelector('img');
  }
  const imageRow = [bgImg ? bgImg : ''];

  // --- 3. Text content row ---
  let textContent = [];
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    const gridChildren = grid.querySelectorAll(':scope > div');
    if (gridChildren.length > 1) {
      const textContainer = gridChildren[1];
      const h1 = textContainer.querySelector('h1');
      if (h1) textContent.push(h1);
      // If there are other text elements (subheading, CTA), add them here in future
      const buttonGroup = textContainer.querySelector('.button-group');
      if (buttonGroup && buttonGroup.children.length > 0) {
        textContent.push(buttonGroup);
      }
    }
  }
  const textRow = [textContent.length ? textContent : ''];

  // --- Build the table ---
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
