/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Background images row
  let imagesRowContent = [];
  const gridLayouts = element.querySelectorAll('.grid-layout.desktop-3-column');
  if (gridLayouts.length > 0) {
    const imgs = gridLayouts[0].querySelectorAll('img');
    if (imgs.length > 0) {
      imagesRowContent = Array.from(imgs);
    }
  }
  const imagesRow = [imagesRowContent.length > 0 ? imagesRowContent : ''];

  // 3. Content row (title, subheading, CTA)
  let contentRowContent = [];
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (contentContainer) {
    const innerContainer = contentContainer.querySelector('.container');
    if (innerContainer) {
      const h1 = innerContainer.querySelector('h1');
      if (h1) contentRowContent.push(h1);
      const subheading = innerContainer.querySelector('p');
      if (subheading) contentRowContent.push(subheading);
      const buttonGroup = innerContainer.querySelector('.button-group');
      if (buttonGroup) {
        const ctas = Array.from(buttonGroup.querySelectorAll('a'));
        if (ctas.length > 0) {
          contentRowContent = contentRowContent.concat(ctas);
        }
      }
    }
  }
  const contentRow = [contentRowContent.length > 0 ? contentRowContent : ''];

  // 4. Build table
  const cells = [
    headerRow,
    imagesRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace original element
  element.replaceWith(block);
}
